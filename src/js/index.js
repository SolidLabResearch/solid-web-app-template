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

async function loginAndFetch(oidcIssuer) {
  if (!getDefaultSession().info.isLoggedIn) {
    await login({
      oidcIssuer,
      redirectUrl: window.location.href,
    });
  }
}

async function clickLogInBtn(solidFetch) {
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
    loginAndFetch(bindings[0].get('oidcIssuer').id, solidFetch);
  } else {
    document.getElementById('no-oidc-issuer-error').classList.remove('hidden');
  }
}

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
