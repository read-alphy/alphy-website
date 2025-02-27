// middleware.js at project root
export function middleware(request) {
    // Just pass through the request
    return;
  }
  
  export const config = {
    // Apply this middleware only to the dynamic routes
    matcher: ['/:source_type/:source_id*'],
  };