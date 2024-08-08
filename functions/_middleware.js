export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.slice(1); // Remove the leading '/'

  let redirectUrl;

  if (path) {
    const redirectKey = `redirect:${path}`;
    redirectUrl = await env.REDIRECT_KV.get(redirectKey);
  }

  if (!redirectUrl) {
    const fallbackRedirectKey = `redirect:*`;
    redirectUrl = await env.REDIRECT_KV.get(fallbackRedirectKey);
  }

  if (redirectUrl) {
    return Response.redirect(redirectUrl, 302);
  }

  // If no redirect is found, continue processing the request
  return context.next();
}