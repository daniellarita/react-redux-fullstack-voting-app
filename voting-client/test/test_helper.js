import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

// create jsdom versions of the document and window objects that would normall be provided by the web browser
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// put them on the global object so they are discovered by react when it access document or window
global.document = doc;
global.window = win;

// take all properties that the jsdom window object contains and hoist them on to the Node.js global object (now can be used without window. prefix which React relies on)
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
