// MOVABLE AND EDITABLE OBJECT (DRAG AND DROP)
function init() {
const mvBlocs = document.querySelectorAll('div.movableBloc');
let initColor, mousePosOnClick, moving = [];
let blockPosOnClick = [];
const availableColor = {
	'Blue' : 'rgb(0, 0, 255)',
	'Green' : 'rgb(0, 128, 0)',
	'Black' : 'rgb(0, 0, 0)',
	'Coral' : 'rgb(255, 127, 80)'
};

	for (let i = 0; i < mvBlocs.length; i++) { // SELECTING ALL MOVABLE BLOCS, SETTING THEM THE EVENTS
		mvBlocs[i].addEventListener('mousedown', function (e) {	// SET COORD WHEN CLICK ON BLOCK
			if (document.getElementById('dragNDrop').checked) {
				const targetBlockId = e.target.classList[1];
				moving = [true, targetBlockId];	// IS MOVING AND WHICH BLOCK
				initColor = e.target.style.backgroundColor;
				e.target.style.backgroundColor = 'red';
				mousePosOnClick = [		// GET MOUSE POS ON CLICK TO SETUP THE CENTER
					e.clientX,
					e.clientY
				];
				blockPosOnClick = [	// GET BLOC POS ON CLICK TO SETUP THE CENTER
					e.target.getBoundingClientRect().left,
					e.target.getBoundingClientRect().top
				];
			}
		});
	}
	document.addEventListener('mouseup', function (e) {	// STOP DRAGGING WHEN MOUSE DROPPED
		if (document.getElementById('dragNDrop').checked && moving[0]) {
			mvBlocs[moving[1]].style.backgroundColor = initColor;
			moving = [];
			blockPosOnClick = [];
		}
	});
	document.addEventListener('mousemove', function (e) {	// MOVING BLOCK WITH MOUSE
		if (document.getElementById('dragNDrop').checked) {
			/*		const maxMovingCoord = document.getElementById('movingZone').getBoundingClientRect();
					const movingBlocPos = mvBlocs[0].getBoundingClientRect();*/
			if (moving[0]) {
				mvBlocs[moving[1]].style.left = e.clientX - (mousePosOnClick[0] - blockPosOnClick[0]) + "px";
				mvBlocs[moving[1]].style.top = e.clientY - (mousePosOnClick[1] - blockPosOnClick[1]) + "px";
			}
		}
	});

	mvBlocs[0].addEventListener('click', function (e) {	// PURPOSE COLORS
		if (document.getElementById('color').checked && e.target.nodeName === 'DIV' && !document.getElementById('colorChoice')) {
			const selectColor = document.createElement('select');
			selectColor.setAttribute('name', 'colorChoice');
			selectColor.setAttribute('id', 'colorChoice');
			selectColor.style.position = 'absolute';
			selectColor.style.left = e.clientX - mvBlocs[0].getBoundingClientRect().left + "px";
			selectColor.style.top = e.clientY - mvBlocs[0].getBoundingClientRect().top + "px";

			for (let i in availableColor) {
				let newOption = document.createElement('option');
				newOption.setAttribute('value', i);
				if (availableColor[i] === getComputedStyle(mvBlocs[0]).backgroundColor) {
					newOption.selected = true;
				}
				newOption.textContent = i;
				selectColor.appendChild(newOption);
			}
			mvBlocs[0].appendChild(selectColor);

			document.getElementById('colorChoice').addEventListener('change', function () {
				const colorChoice = document.getElementById('colorChoice').value;
				if (availableColor[colorChoice] !== getComputedStyle(mvBlocs[0]).backgroundColor) {
					mvBlocs[0].style.backgroundColor = availableColor[colorChoice];
				}

				mvBlocs[0].removeChild(selectColor)
			});
		}
	});
}

init();