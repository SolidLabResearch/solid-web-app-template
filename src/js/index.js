import {login, getDefaultSession, handleIncomingRedirect} from '@inrupt/solid-client-authn-browser';
import {QueryEngine} from "@comunica/query-sparql";

window.onload = async () => {
  document.getElementById('log-in-btn').addEventListener('click', () => {
    clickLogInBtn()
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
    document.getElementById('query-books').classList.remove('hidden');
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
