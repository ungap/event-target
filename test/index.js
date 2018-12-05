try {
  new Event('');
} catch(e) {
  global.Event = function (type) {
    this.type = type;
  };
}

var EventTarget = require('../cjs');
test();

// delete require.cache[require.resolve('../cjs')];
// global.CustomEvent = CustomEvent;

function test() {
  var added = () => console.log(1);
  var eventTarget = new EventTarget;
  eventTarget.dispatchEvent(new Event('foo'));
  eventTarget.addEventListener('foo', added, {once: true});
  eventTarget.addEventListener('foo', added, {once: true});
  eventTarget.addEventListener('foo', () => console.log(2), {once: true});
  eventTarget.removeEventListener('foo', added, {once: true});
  eventTarget.removeEventListener('foo', added, {once: true});
  eventTarget.dispatchEvent(new Event('foo'));
  eventTarget = new EventTarget;
  eventTarget.addEventListener('foo', {
    handleEvent: function () {
      console.log(1);
    }
  });
  eventTarget.addEventListener('foo', () => console.log(2));
  eventTarget.dispatchEvent(new Event('foo'));
}
