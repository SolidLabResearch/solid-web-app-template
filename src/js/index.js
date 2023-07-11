import {login, getDefaultSession, handleIncomingRedirect, fetch} from '@inrupt/solid-client-authn-browser';
import {QueryEngine} from "@comunica/query-sparql";

window.onload = async () => {
  document.getElementById('log-in-btn').addEventListener('click', () => {
    clickLogInBtn()
  });

  document.getElementById('query-wish-list').addEventListener('click', () => {
    queryBooks('http://localhost:3000/example/wish-list');
  });

  document.getElementById('query-favourite-books').addEventListener('click', () => {
    queryBooks('http://localhost:3000/example/favourite-books');
  });

  // This function check if the app is reloaded after a login.
  // This will also restore the session if the user previously logged in.
  await handleIncomingRedirect({
    url: window.location.href,
    restorePreviousSession: true
  });

  if (getDefaultSession().info.isLoggedIn) {
    const webid = getDefaultSession().info.webId;
    console.log(webid);

    document.getElementById('webid-form').classList.add('hidden');
    document.getElementById('current-user').classList.remove('hidden');
    document.getElementById('query-favourite-books').classList.remove('hidden');
    document.getElementById('current-user').innerText = 'Logged in with WebID ' + webid;
  }
}

/**
 * This method logs in the user via a given OIDC issuer.
 * The user is redirected to the login page of the identity provider
 * and all state of the app is gone.
 * @param oidcIssuer - The OIDC issuer to log in with.
 * @returns {Promise<void>}
 */
async function solidLogin(oidcIssuer) {
  if (!getDefaultSession().info.isLoggedIn) {
    await login({
      oidcIssuer,
      redirectUrl: window.location.href,
    });
  }
}

/**
 * This function handles the click on the login button.
 * It fetches the OIDC issuer from the WebID
 * and uses that to login.
 * @returns {Promise<void>}
 */
async function clickLogInBtn() {
  const webId = document.getElementById('webid').value;
  const myEngine = new QueryEngine();
  const bindingsStream = await myEngine.queryBindings(`
  PREFIX solid: <http://www.w3.org/ns/solid/terms#> 
  SELECT ?oidcIssuer WHERE {
    <${webId}> solid:oidcIssuer ?oidcIssuer
  }`, {
    sources: [webId],
  });

  const bindings = await bindingsStream.toArray();

  if (bindings.length > 0) {
    if (bindings.length > 1) {
      console.warn(`More than 1 OIDC issuer is present in the WebID. Using the first one returned by Comunica.`);
    }

    console.log('Using OIDC issuer: ' + bindings[0].get('oidcIssuer').id);
    solidLogin(bindings[0].get('oidcIssuer').id);
  } else {
    document.getElementById('no-oidc-issuer-error').classList.remove('hidden');
  }
}

/**
 * This function queries a list of books at the given url.
 * The results are shown in the HTML as an unordered list.
 * @param url - The url of a resource with books.
 * @returns {Promise<void>}
 */
async function queryBooks(url) {
  const myEngine = new QueryEngine();
  const bindingsStream = await myEngine.queryBindings(`
  PREFIX schema: <http://schema.org/> 
  SELECT * WHERE {
   ?list schema:name ?listTitle;
     schema:itemListElement [
     schema:name ?bookTitle;
     schema:creator [
       schema:name ?authorName
     ]
   ].
  }`, {
    sources: [url],
    fetch
  });
  // The above fetch is an authenticated fetch once the user is logged in.

  const bindings = await bindingsStream.toArray();
  let content = '';

  for (const binding of bindings) {
    content += `<li>${binding.get('bookTitle').value} (${binding.get('authorName').value})</li>`;
  }

  const $ul = document.getElementById('list');
  $ul.innerHTML = content;
  $ul.classList.remove('hidden');

  const $title = document.getElementById('list-title');
  $title.innerText = bindings[0].get('listTitle').value;
  $title.classList.remove('hidden');
}
