const STEPS_X = [15, 90, 165, 240, 315];
const STEPS_Y = [20, 45, 70, 95, 120];

const getBricksData = (data) => {
	return data.reduce((bricks, row, rowIndex) => {
		return bricks.concat(row.map((item, colIndex) => {
			return {
				hp: item,
				x: STEPS_X[colIndex],
				y: STEPS_Y[rowIndex]
			}
		}))
	}, []);
}

let one = getBricksData([
	[1, 1, 1, 1, 1],
	[0, 2, 2, 2, 0],
	[0, 0, 3, 0, 0],
]);

let two = getBricksData([
	[1, 1, 1, 1, 1],
	[0, 2, 2, 2, 0],
	[0, 0, 3, 0, 0],
]);

let three = getBricksData([
	[0, 0, 0, 0, 0],
	[0, 2, 2, 2, 0],
	[0, 0, 3, 0, 0],
	[0, 2, 2, 2, 0],
	[0, 2, 2, 2, 0],
]);

const LEVELS = {one, two, three};

export default LEVELS;