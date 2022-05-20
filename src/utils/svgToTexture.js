// (\s+)\[\n\s+(\d+),\n\s+(\d+)\n\s+\](,?)
// $1[$2, $3]$4

export function svgToTexture(svg) {
  let texture = {
    width: svg.getAttribute('width'),
    height: svg.getAttribute('height'),
    paths: [],
  };

  const COLORS = {
    '#666666': '00',
    '#002A88': '01',
    '#1412A8': '02',
    '#3B00A4': '03',
    '#5C007E': '04',
    '#6E0040': '05',
    '#6C0700': '06',
    '#571D00': '07',
    '#343500': '08',
    '#0C4900': '09',
    '#005200': '0A',
    '#004F08': '0B',
    '#00404E': '0C',
    '#000000': '0D',
    '#AEAEAE': '10',
    '#155FDA': '11',
    '#4240FE': '12',
    '#7627FF': '13',
    '#A11BCD': '14',
    '#B81E7C': '15',
    '#B53220': '16',
    '#994F00': '17',
    '#6C6E00': '18',
    '#388700': '19',
    '#0D9400': '1A',
    '#009032': '1B',
    '#007C8E': '1C',
    '#080808': '1D',
    '#FEFEFE': '20',
    '#64B0FE': '21',
    '#9390FE': '22',
    '#C777FE': '23',
    '#F36AFE': '24',
    '#FE6ECD': '25',
    '#FE8270': '26',
    '#EB9F23': '27',
    '#BDBF00': '28',
    '#89D900': '29',
    '#5DE530': '2A',
    '#45E182': '2B',
    '#48CEDF': '2C',
    '#444444': '2D',
    '#FFFFFF': '30',
    '#C1E0FE': '31',
    '#D4D3FE': '32',
    '#E9C8FE': '33',
    '#FBC3FE': '34',
    '#FEC5EB': '35',
    '#FECDC6': '36',
    '#F7D9A6': '37',
    '#E5E695': '38',
    '#D0F097': '39',
    '#BEF5AB': '3A',
    '#B4F3CD': '3B',
    '#B5ECF3': '3C',
    '#B8B8B8': '3D',
  };

  function parsePathData(data) {
    function move({ direction, numbers, point }) {
      switch (direction) {
        case 'H': {
          return [numbers[0], point[1]];
        }
        case 'V': {
          return [point[0], numbers[0]];
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
          result.points.push(numbers);
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

  function addPathLine({ fill, fillRule, last }) {
    return function reduce(result, data, index) {
      const path = {};

      if (!index) {
        path.begin = true;
      }

      path.points = parsePathData(data);

      if (index === last) {
        if (fill) {
          path.fill = COLORS[fill];
        }

        if (fillRule) {
          path.fill = fillRule;
        }
      }

      result.paths.push(path);

      return result;
    };
  }

  for (let i = 0; i < svg.childElementCount; i += 1) {
    const path = svg.children[i];
    const d = path.getAttribute('d');
    const fill = path.getAttribute('fill');
    const fillRule = path.getAttribute('fillRule');
    const lines = d.split(/z/i).filter(x => x);
    texture = lines.reduce(addPathLine({ fill, fillRule, last: lines.length - 1 }), texture);
  }

  return texture;
}
