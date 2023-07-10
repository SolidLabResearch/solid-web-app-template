import {login, getDefaultSession, handleIncomingRedirect} from '@inrupt/solid-client-authn-browser'

window.onload = () => {
  loginAndFetch()
}

async function loginAndFetch() {
  await handleIncomingRedirect({
    url: window.location.href,
    restorePreviousSession: true
  });

  // 2. Start the Login Process if not already logged in.
  if (!getDefaultSession().info.isLoggedIn) {

    // The `login()` redirects the user to their identity provider;
    // i.e., moves the user away from the current page.
    await login({
      // Specify the URL of the user's Solid Identity Provider; e.g., "https://broker.pod.inrupt.com" or "https://inrupt.net"
      oidcIssuer: 'http://localhost:3000',
      // Specify the URL the Solid Identity Provider should redirect to after the user logs in,
      // e.g., the current page for a single-page app.
      redirectUrl: window.location.href,
      //clientId: 'http://localhost:8081/id' //'https://knoodle.knows.idlab.ugent.be/id'
    });

  } else {
    const webid = getDefaultSession().info.webId;
    console.log(webid);
  }
}
