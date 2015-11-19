# Welcome to your new realtime app


# Streaming

This implementation is configured to use SockJS client and server to communicate. This is considered a very
robust implementation with a wide range of programming languages supported. It has fewer features than engine.io

SockJS Browser Quirks
--------------

There are various browser quirks which we don't intend to address:

 * Pressing ESC in Firefox, before Firefox 20, closes the SockJS connection. For a workaround
   and discussion see [#18](https://github.com/sockjs/sockjs-client/issues/18).
 * `jsonp-polling` transport will show a "spinning wheel" (aka. "busy indicator")
   when sending data.
 * You can't open more than one SockJS connection to one domain at the
   same time due to [the browser's limit of concurrent connections](http://stackoverflow.com/questions/985431/max-parallel-http-connections-in-a-browser)
   (this limit is not counting native WebSocket connections).
 * Although SockJS is trying to escape any strange Unicode characters
   (even invalid ones - [like surrogates \xD800-\xDBFF](http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates) or [\xFFFE and \xFFFF](https://en.wikipedia.org/wiki/Unicode#Character_General_Category))
   it's advisable to use only valid characters. Using invalid
   characters is a bit slower, and may not work with SockJS servers
   that have proper Unicode support.
 * Having a global function called `onmessage` or such is probably a
   bad idea, as it could be called by the built-in `postMessage` API.
 * From SockJS' point of view there is nothing special about
   SSL/HTTPS. Connecting between unencrypted and encrypted sites
   should work just fine.
 * Although SockJS does its best to support both prefix and cookie based
   sticky sessions, the latter may not work well cross-domain with
   browsers that don't accept third-party cookies by default (Safari).
   In order to get around this make sure you're connecting to SockJS
   from the same parent domain as the main site. For example
   'sockjs.a.com' is able to set cookies if you're connecting from
   'www.a.com' or 'a.com'.
 * Trying to connect from secure "https://" to insecure "http://" is
   not a good idea. The other way around should be fine.
 * Long polling is known to cause problems on Heroku, but a
   [workaround for SockJS is available](https://github.com/sockjs/sockjs-node/issues/57#issuecomment-5242187).
 * Don't use "javascript:" links on a page that uses SockJS. For
   some reason clicking on this type of link breaks XDR/XHR requests
   on IE (see [#90](https://github.com/sockjs/sockjs-client/issues/90)).
 * SockJS [websocket transport is more stable over SSL](https://github.com/sockjs/sockjs-client/issues/94). If
   you're a serious SockJS user then consider using SSL
   ([more info](http://www.ietf.org/mail-archive/web/hybi/current/msg01605.html)).
