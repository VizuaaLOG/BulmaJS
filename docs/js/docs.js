// Remove additional indentation from code blocks.
// Thanks to https://stackoverflow.com/a/26230865
[].forEach.call(document.querySelectorAll('code'), function($code) {
    var lines = $code.textContent.split('\n');

    if (lines[0] === '')
    {
        lines.shift()
    }

    var matches;
    var indentation = (matches = /^[\s\t]+/.exec(lines[0])) !== null ? matches[0] : null;
    if (!!indentation) {
        lines = lines.map(function(line) {
            line = line.replace(indentation, '')
            return line.replace(/\t/g, '    ')
        });

        $code.textContent = lines.join('\n').trim();
    }
});
