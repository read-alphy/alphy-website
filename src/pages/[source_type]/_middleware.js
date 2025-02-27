export default function middleware(req) {
    // This helps Cloudflare handle these routes properly
    return req;
  }
  
  export const config = {
    matcher: ['/:source_type/:source_id*'],
  };