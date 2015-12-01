## fastly
### [Fastly](http://www.fastly.com) API client for Node.js

[![Build Status](https://travis-ci.org/thisandagain/fastly.png?branch=master)](https://travis-ci.org/thisandagain/fastly)

### Installation
```bash
npm install fastly
```

### Basic Use
```javascript
var fastly = require('fastly')('yourapikey');

fastly.request('GET', '/content/edge_check?url=mysite.com/foo', function (err, obj) {
    if (err) return console.dir(err);   // Oh no!
    console.dir(obj);                   // Response body from the fastly API
});
```

### Helper Methods
The fastly module also includes a few limited "helper" methods that make working with common API resources a bit simpler:

<table width="100%">
    <tr>
        <th width="20%">Method</td>
        <th width="75%">Example</td>
        <th width="5%"></td>
    </tr>
    <tr>
        <td>purge</td>
        <td><pre lang="javascript"><code>fastly.purge('host.com', '/index.html', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/purge#purge_1">Link</a></td>
    </tr>
    <tr>
        <td>purgeAll</td>
        <td><pre lang="javascript"><code>fastly.purgeAll('myServiceId', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/purge#purge_2">Link</a></td>
    </tr>
    <tr>
        <td>purgeKey</td>
        <td><pre lang="javascript"><code>fastly.purgeKey('myServiceId', 'key', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/purge#purge_3">Link</a></td>
    </tr>
    <tr>
        <td>stats</td>
        <td><pre lang="javascript"><code>fastly.stats('myServiceId', callback);</code></pre></td>
        <td><a href="https://www.fastly.com/docs/api/stats">Link</a></td>
    </tr>
    <tr>
        <td>getService</td>
        <td><pre lang="javascript"><code>fastly.getService('myServiceId', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#service_2">Link</a></td>
    </tr>
    <tr>
        <td>getVersions</td>
        <td><pre lang="javascript"><code>fastly.getVersions('myServiceId', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#version_1">Link</a></td>
    </tr>
    <tr>
        <td>cloneVersion</td>
        <td><pre lang="javascript"><code>fastly.cloneVersion('myServiceId', 'version', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#version_7">Link</a></td>
    </tr>
    <tr>
        <td>activateVersion</td>
        <td><pre lang="javascript"><code>fastly.activateVersion('myServiceId', 'version', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#version_5">Link</a></td>
    </tr>
    <tr>
        <td>createDomain</td>
        <td><pre lang="javascript"><code>fastly.createDomain('myServiceId', 'version', 'domain', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#domain_4">Link</a></td>
    </tr>
    <tr>
        <td>deleteDomain</td>
        <td><pre lang="javascript"><code>fastly.deleteDomain('myServiceId', 'version', 'domain', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#domain_6">Link</a></td>
    </tr>

    <tr>
        <td>getDictionary</td>
        <td><pre lang="javascript"><code>fastly.getDictionary('myServiceId', 'version', 'dictionaryName', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#dictionary_2">Link</a></td>
    </tr>
    <tr>
        <td>createDictionaryItem</td>
        <td><pre lang="javascript"><code>fastly.createDictionaryItem('myServiceId', 'dictionary', 'key', 'value', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#dictionary_item_3">Link</a></td>
    </tr>
    <tr>
        <td>deleteDictionaryItem</td>
        <td><pre lang="javascript"><code>fastly.deleteDictionaryItem('myServiceId', 'dictionary', 'key', callback);</code></pre></td>
        <td><a href="https://docs.fastly.com/api/config#dictionary_item_5">Link</a></td>
    </tr>


</table>

### Testing
```bash
npm test
```
