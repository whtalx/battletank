export function svgToFont(svg) {
  let paths = [];

  function parsePathData(data) {
    function move({ direction, numbers, point }) {
      switch (direction) {
        case 'H': {
          return [numbers[0], point[1]];
        }
        case 'V': {
          return [point[0], 14 - numbers[0]];
        }
        case 'h': {
          if (isNaN(point[0] + numbers[0])) debugger;
          return [point[0] + numbers[0], point[1]];
        }
        case 'v': {
          if (isNaN(point[1] + numbers[0])) debugger;
          return [point[0], point[1] + numbers[0]];
        }

        default: {
          debugger;
          return point;
        }
      }
    }

    function reduceCharacters(result, character) {
      if (!character) return result;

      if (/[\d.-]/.test(character)) {
        result.numbers[result.numbers.length - 1] += character;
        return result;
      } else if (/\s/.test(character)) {
        result.numbers.push('');
        return result;
      } else if (result.direction) {
        const { direction, points } = result;
        const numbers = result.numbers.map((x) => {
          const num = parseFloat(x);

          if (isNaN(num)) debugger;

          return num;
        });

        if (/m/i.test(direction)) {
          result.points.push([numbers[0], 14 - numbers[1]]);
        } else if (/[vh]/i.test(direction)) {
          result.points.push(move({ direction, numbers, point: points[points.length - 1] }));
        }
      }

      result.direction = character;
      result.numbers = [''];
      return result;
    }

    return data.split('').reduce(reduceCharacters, { points: [] }).points;
  }

  function addPathLine(result, data) {
    result.push(parsePathData(data));
    return result;
  }

  for (let i = 0; i < svg.childElementCount; i += 1) {
    const path = svg.children[i];
    const d = path.getAttribute('d');
    const lines = d.split(/z/i).filter((x) => x);
    paths = lines.reduce(addPathLine, paths);
  }

  return paths;
}

// JSON.stringify(svgToFont($0))
//   .replace(/,/g, ', ')
//   .replace(/\[\[\[/g, '[\n    [[')
//   .replace(/\]\]\]/g, ']]\n  ]')
//   .replace(/\]\], \[\[/g, ']],\n    [[');
