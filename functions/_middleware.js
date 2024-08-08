export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.slice(1); // Remove the leading '/'

  if (path) {
    const redirectKey = `redirect:${path}`;
    const redirectUrl = await env.REDIRECT_KV.get(redirectKey);

    if (redirectUrl) {
      return Response.redirect(redirectUrl, 302);
    }
  }

  // If no redirect is found, continue processing the request
  return context.next();
}