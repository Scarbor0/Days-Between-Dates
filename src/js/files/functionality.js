import { resultRenderHtml } from "./resultRender.js";
import { DaysBetweenDates } from "./DaysBetweenDates.js";


// function calendarGen(year) {
// 	const daysArray = [];

// 	for (let i = 0; i < 12; i++) {
// 		const daysInMonth = new Date(year, i + 1, 0).getDate();
// 		daysArray.push(daysInMonth);
// 	}
// 	return daysArray;
// }


export class InputsDbd {
	constructor(selector) {
		// this.resultRenderHtml = resultRenderHtml()
		this.$el = document.querySelectorAll(selector);

		this.$dbdTextRender = document.querySelector('.days-between-dates')

		this.$btnSubmit = document.querySelector('.main__btn-submit')
		this.btnsSettings = document.querySelector('.main__settings')

		this.$inputD = document.getElementById('dateStartD');
		this.$inputM = document.getElementById('dateStartM');
		this.$inputY = document.getElementById('dateStartY');

		this.memoryInputsStart = ''
		this.memoryInputsEnd = ''
		this.trueMaxD //! правильна к-сть днів в місяці якщо нам відомо міс. і р.
		this.trueMaxDEnd //! правильна к-сть днів в місяці якщо нам відомо міс. і р.

		this.$inputEndD = document.getElementById('dateEndD');
		this.$inputEndM = document.getElementById('dateEndM');
		this.$inputEndY = document.getElementById('dateEndY');

		this.currentEndD = this.formatDateTwoNum(new Date().getDate())
		this.currentEndM = this.formatDateTwoNum(new Date().getMonth() + 1)
		this.currentEndY = new Date().getFullYear()

		console.error('this.formatDateTwoNum(new Date().getDate())', this.formatDateTwoNum(9));
		
		this.$inputEndD.placeholder = this.currentEndD;
		this.$inputEndM.placeholder = this.currentEndM;
		this.$inputEndY.placeholder = this.currentEndY;
		
		this.currentDate = `${this.currentEndD}.${this.currentEndM}.${this.currentEndY}`
		console.error('this.formatDateTwoNum(new Date().getDate())', this.currentDate);

		this.$checkedFirstDay = document.querySelector(`[data-input-setting="first-day"]`)
		this.$checkedLastDay = document.querySelector(`[data-input-setting="last-day"]`)

		this.includingFirstDay = false
		this.includingLastDay = false

		this.isLoad = false 
		window.addEventListener('load', ()=> {
			this.isLoad = true
			// console.error('isLoad = true', this.isLoad);
		})

		this.resultDbdVisible = false;
	} 

	validEventTargetInput(eventTargetInput, count) {
		const eValue = eventTargetInput.value;
		if (count === 3 || count === 4 || count === 5) {
			if (eValue !== '') {
				this.$inputEndD.placeholder = 'дд'
				this.$inputEndM.placeholder = 'мм'
				this.$inputEndY.placeholder = 'рррр'
			} else {
				this.$inputEndD.placeholder = this.currentEndD;
				this.$inputEndM.placeholder = this.currentEndM;
				this.$inputEndY.placeholder = this.currentEndY;
			}
			
		}

		if (count === 2 || count === 5) {
			console.log(count);
			eventTargetInput.value = eValue.replace(/(.{4})./, '$1').replace(/[^\d]/g, '')
			if (this.$el[count].value.length >= 4) {
				if (count + 1 < 4) {
					this.$el[count + 1].focus();

				}
			}
		} else {
			eventTargetInput.value = eValue.replace(/(.{2})./, '$1').replace(/[^\d]/g, '')
			if (this.$el[count].value.length >= 2) {
				this.$el[count + 1].focus();
			}

			if (count === 0 || count === 3 && this.isLoad === true) {
				console.error('(count === 0 || count === 3)')
				if (Number(eventTargetInput.value) > 31) {
					this.colorErrorInputOverDate(eventTargetInput, '31', 'red', 'black', count)
				}
				if (eventTargetInput.value === '00') {
					this.colorErrorInputOverDate(eventTargetInput, '01', 'red', 'black', count)
					
				}
				
			}

			if (count === 1 || count === 4) {
				if (eventTargetInput.value === '00') {
					// eventTargetInput.value = value.replace(/\d+/, '01')
					this.colorErrorInputOverDate(eventTargetInput, '01', 'red', 'black', count)
					
				}
				if (Number(eventTargetInput.value) > 12) {
					// eventTargetInput.value = value.replace(/\d+/, '01')
					this.colorErrorInputOverDate(eventTargetInput, '12', 'red', 'black', count)
					
				}
			}
			
		}

		// if (count === 1 && eventTargetInput.value.length === 2
		// 	|| count === 2 && eventTargetInput.value.length === 4
		// 	|| count === 4 && eventTargetInput.value.length === 2
		// 	|| count === 5 && eventTargetInput.value.length === 4) {
		// 	console.error('eventTargetInputMY.value.length === 2 and 4', eventTargetInput);
			
		// }

		// if (count === 1 
		// 		&& eventTargetInput.value.length === 2
				
		// 		&& eventTargetInput.value.length === 4) {
		// 			console.err('eventTargetInputMY.value.length === 2 and 4');
		// }
	}

	autoRenameDayInYear(mo, ye) {
		if (this.$inputD.value.length === 2 
				&& this.$inputM.value.length === 2 
				&& this.$inputY.value.length === 4

				|| this.$inputEndD.value.length === 2
				&& this.$inputEndM.value.length === 2
				&& this.$inputEndY.value.length === 4) {

			const d = Number(this.$inputD.value)
			const m = Number(this.$inputM.value)
			const y = Number(this.$inputY.value)
			

			const dEnd = Number(this.$inputEndD.value)
			const mEnd = Number(this.$inputEndM.value)
			const yEnd = Number(this.$inputEndY.value)
			

			const calendarGen = (year, index)=> {
				const daysArray = [];
		
				for (let i = 0; i < 12; i++) {
					const daysInMonth = new Date(year, i + 1, 0).getDate();
					daysArray.push(daysInMonth);
				}
				// console.log('autoRenameDayInYear FN');
				return daysArray[index];
			}
			// if
			// let trueMaxD
			// let trueMaxDEnd
			// this.memoryInputsStart = []
			// this.memoryInputsStart.push(this.$inputD.value)
			// this.memoryInputsStart.push(this.$inputM.value)
			// this.memoryInputsStart.push(this.$inputY.value)
			if (this.$inputM.value !== '' && this.$inputY.value !== '') {
				let onlineInputsStart = `${this.$inputM.value}${this.$inputY.value}`
				
				if (onlineInputsStart !== this.memoryInputsStart) {
					this.memoryInputsStart = `${this.$inputM.value}${this.$inputY.value}`
					this.trueMaxD = calendarGen(y, m - 1)
					console.log('this.memoryInputsStart', this.memoryInputsStart, this.trueMaxD);
					
				}
			} else {
				this.memoryInputsStart === ''
			}

			if (this.memoryInputsEnd[0] !== this.$inputEndM.value
				|| this.memoryInputsEnd[1] !== this.$inputEndY.value) {
					this.memoryInputsEnd = [this.$inputEndM.value, this.$inputEndY.value]
					this.trueMaxDEnd = calendarGen(yEnd, mEnd - 1)		
					console.log('this.memoryInputsEnd', this.memoryInputsEnd, this.trueMaxDEnd);
					
				}
			
			
				
				if (Number(this.$inputD.value) > this.trueMaxD ) {
					this.$inputD.style.color = 'red';
					setTimeout(() => {
						this.$inputD.value = this.trueMaxD
						this.$inputD.style.color = 'green'
						setTimeout(() => {
							this.$inputD.style.color = 'black'
						}, 1000);
					}, 1000);
					localStorage.setItem('inputD', this.trueMaxD)
					console.log('autoRenameDayInYear StartDays', this.trueMaxD);
				}
				
				if (Number(this.$inputEndD.value) >= this.trueMaxDEnd) {
					this.$inputEndD.value = this.trueMaxDEnd
					localStorage.setItem('inputEndD', this.$inputEndD.value)
					console.log('autoRenameDayInYear EndDays');
				}
			


		}
	}

	runSetItemLS(count, $element) {
			switch (count) {
			case 0:
				localStorage.setItem('inputD', $element)
				break;
			case 1:
				localStorage.setItem('inputM', $element)
				break;
			case 2:
				localStorage.setItem('inputY', $element)
				break;

			case 3:
				localStorage.setItem('inputEndD', $element)
				break;
			case 4:
				localStorage.setItem('inputEndM', $element)
				break;
			case 5:
				localStorage.setItem('inputEndY', $element)
				break;
		}
	}

	ifRenderResultDbd() {
		
		// const resultDbd = document.querySelector('.dbd-table');
		const resultDbd = document.querySelector('.result-render-dbd');
		if (resultDbd) {
		this.resultDbdVisible = true;
		localStorage.setItem('resultDbdVisible', this.resultDbdVisible)
		} else {
			this.resultDbdVisible = false;
			localStorage.setItem('resultDbdVisible', this.resultDbdVisible)
		}
		
	}

	// showSubmitLoadingAnimation(dateStart, dateEndError) { 
	// 	console.log('dateStart dateStart', dateStart);
	// 	const resultDbd = document.querySelector('.result-render-dbd');
	// 	if (dateStart !== false) {
	// 		console.error('if (!resultDbd) {', resultDbd);
	// 		this.$dbdTextRender.insertAdjacentHTML('beforeend', `
	// 			<h1 class="show-submit-load">Load</h1>
	// 		`)
	// 	} else if (resultDbd) {
	// 		// const showSubmitLoad = document.querySelector('.show-submit-load');
	// 		// showSubmitLoad.remove()
	// 	}
	// }

	// removeSubmitLoadingAnimation() {
	// 	const showSubmitLoad = document.querySelector('.show-submit-load');
	// 	if (showSubmitLoad) {
	// 		showSubmitLoad.remove()
	// 	}
	// }
	

	colorErrorInputOverDate($el, rplc, colorEror, color, count) {
		$el.style.color = colorEror
			setTimeout(()=> {
				$el.style.color = 'green'
				$el.value = $el.value.replace(/\d+/, rplc)
				// localStorage.setItem('inputD', $el.value)
				this.runSetItemLS(count, $el.value)
				setTimeout(() => {
					$el.style.color = color
				}, 1000);
			}, 1000)
	}

	inputsFocusKey(eventTargetInput, count) {
		this.countBackspace = 0
		let countBackspacePositionZero = 0
		let countKeyLeft = 0
		let countKeyRight = 0

		const cursorPosition = eventTargetInput.selectionStart;
		eventTargetInput.setSelectionRange(cursorPosition, cursorPosition);

		let lastCursorPosition;

		eventTargetInput.addEventListener('blur', function(e) {

			console.log('this.$el[count]', eventTargetInput.value.length);
			const changeFirstStr = (str)=> {
				eventTargetInput.value = eventTargetInput.value.replace(/^(\d)$/, `${str}$1`)
			}

				if (eventTargetInput.value.length === 1 
					&& count === 0 
					|| count === 1 
					|| count === 3 
					|| count === 4 
					) {
						if (eventTargetInput.value === "0") {
							eventTargetInput.value = eventTargetInput.value.replace(/\d+/, `01`)
							
						}
						// eventTargetInput.value = eventTargetInput.value.replace(/^(\d)$/, '0$1')
						changeFirstStr('0')
					eventTargetInput.addEventListener('blur', (event) => {
						console.log('eventTargetInput.addEventListenerblur');
						// eventTargetInput.value = '0' + eventTargetInput.value
						// eventTargetInput.value = eventTargetInput.value.replace(/^(\d)$/, '0$1')

					})
					
				}
				
				if (count === 2 || count === 5) {
					if (Number(eventTargetInput.value) >= 10 
						&& Number(eventTargetInput.value) <= 29 
						&& eventTargetInput.value.length === 2) {
							eventTargetInput.value = eventTargetInput.value.replace(/^/, `20`)
						}
					if (Number(eventTargetInput.value) >= 30 
						&& Number(eventTargetInput.value) <= 99 
						&& eventTargetInput.value.length === 2) {
							eventTargetInput.value = eventTargetInput.value.replace(/^/, `19`)
						}

					}
				
				switch (count) {
					case 0:
						localStorage.setItem('inputD', e.target.value)
						break;
					case 1:
						localStorage.setItem('inputM', e.target.value)
						break;
					case 2:
						localStorage.setItem('inputY', e.target.value)
						break;

					case 3:
						localStorage.setItem('inputEndD', e.target.value)
						break;
					case 4:
						localStorage.setItem('inputEndM', e.target.value)
						break;
					case 5:
						localStorage.setItem('inputEndY', e.target.value)
						break;
				}

			// Отримання позиції курсора під час втрати фокуса введенням
			lastCursorPosition = eventTargetInput.selectionStart;
			console.log('lastCursorPosition', lastCursorPosition);

		});

	

		eventTargetInput.addEventListener('keyup', (e)=> {
			if (e.key === 'Backspace') {
					this.countBackspace += 1
			}
			if (e.keyCode === 8 && e.target.selectionStart === 0) { //! Backspace key
				countBackspacePositionZero += 1
				this.countBackspace = 0
				console.log('countBackspacePositionZero', countBackspacePositionZero);
				if (count - 1 !== -1 && countBackspacePositionZero === 2) {
					this.$el[count - 1].focus();
					countBackspacePositionZero = 0
				}
				
			} //======================================================================

			if (e.keyCode === 13) { //! Enter key
				e.target.blur()
				window.addEventListener('unload', function() {
					e.target.blur();
				 })
				this.$btnSubmit.click()
			}
			
			if (e.keyCode === 37 && e.target.selectionStart === 0) { //! <- key
				console.log('cursorPosition <- key', cursorPosition);
				countKeyLeft += 1
				countKeyRight = 0
				console.log('countKeyLeft', countKeyLeft);
				if (count - 1 !== -1 && countKeyLeft === 2) {
					countKeyLeft = 0
					this.$el[count - 1].focus();
					const lastSymbol = this.$el[count - 1].value.length
					this.$el[count - 1].setSelectionRange(lastSymbol, lastSymbol)
				}
			}
			if (e.keyCode === 39 && e.target.selectionStart === e.target.value.length) { //! -> key
				console.log('cursorPosition -> key', e.target.selectionStart);
				console.log('e.target.value.length', e.target.value.length);
				countKeyRight += 1
				countKeyLeft = 0
				console.log('countKeyLeft', countKeyRight);
				if (count - 1 !== 4 && countKeyRight === 2) {
					countKeyRight = 0
					this.$el[count + 1].focus();
					this.$el[count + 1].setSelectionRange(0, 0)
				}
			}
		})
	}



	escapeFromFocusInputUnload() {
		this.$el.forEach(elem => {
			window.addEventListener('unload', function() {
			elem.blur();
		 })
		});
	}

	eTargetClick() {
		document.addEventListener('click', (event) => {
			return event.target
		})
	}

	cursorPositionClick(eventTarget, count) {
		let cursorSelection = eventTarget.value.selectionStart 
		if (cursorSelection = 0) {
			// eventTarget
			if (eventTarget.keyCode === 8) { //! Backspace key
				if (count - 1 !== -1 && countBackspace === 2) {
					this.$el[count - 1].focus();
				}
			}
		}
		console.log('cursorPositionClick event.target', eventTarget.selectionStart);
	}
	

	validEventTargetClick(eventTargetClick, count) {
		const value = eventTargetClick.value;
		
		if (count === 2 || count === 5) {
			eventTargetClick.value = value.slice(0, 4)
		} else {
			eventTargetClick.value = value.slice(0, 2)
		}
	}

	setLoadLocalStorage($elem, key) {
		// localStorage.setItem(key, $elem.value);
		// Save the input value in localStorage when it is changed
		$elem.addEventListener('blur', ()=> {
			localStorage.setItem(key, $elem.value);
			console.log('BLUUUR localStorage.setItem(key, $elem.value);', $elem.value);
		})
		$elem.addEventListener('input', () => {
			localStorage.setItem(key, $elem.value);
		});

		// Restore the input value from localStorage when loading the page
		window.addEventListener('load', () => {
			$elem.value = localStorage.getItem(key);
			console.warn('setLoadLocalStorage($elem, key)=======================================================================', this.dateEnd());
			// if ($elem.value !== '') {
			// 	this.$btnSubmit.click();
			// }
			// this.$el.innerHTML = ''
			// if (this.dateStart() !== false) {
			// 		this.$btnSubmit.click();
			// 	}
			
		});
	}

	afterLocalStorageRun() {
		window.addEventListener('load', () => {
			if (this.dateStart() !== false && localStorage.getItem('resultDbdVisible') === 'true') {
					this.$btnSubmit.click();
				}
		})
	}

	loadLocalStorageCheackbox(key, $elem, includingDays) {
		window.addEventListener('load', () => {
			const incDay = localStorage.getItem(key)
		
			if (incDay === 'false') {
				$elem.checked = false
				includingDays = false
			}
			if (incDay === 'true') {
				$elem = true
				includingDays = true
			}
		});
	}

	// runsetItemLocalStorage(key, $el) {
	// 	localStorage.setItem(key, $el)
	// }


	runLocalStorage() {
		this.setLoadLocalStorage(this.$inputD, 'inputD')
		this.setLoadLocalStorage(this.$inputM, 'inputM')
		this.setLoadLocalStorage(this.$inputY, 'inputY')

		this.setLoadLocalStorage(this.$inputEndD, 'inputEndD')
		this.setLoadLocalStorage(this.$inputEndM, 'inputEndM')
		this.setLoadLocalStorage(this.$inputEndY, 'inputEndY')

		this.loadLocalStorageCheackbox('includingFirstDay', this.$checkedFirstDay, this.includingFirstDay)
		this.loadLocalStorageCheackbox('includingLastDay', this.$checkedLastDay, this.includingLastDay)

		this.afterLocalStorageRun()

		return this
	}

	localStorageClear(mod) {
		if (mod === 'start') {
			localStorage.removeItem('inputD');
			localStorage.removeItem('inputM');
			localStorage.removeItem('inputY');

		} else if (mod === 'end') {
			localStorage.removeItem('inputEndD');
			localStorage.removeItem('inputEndM');
			localStorage.removeItem('inputEndY');
		}
	}

	formatDateTwoNum(liveDate) {
		liveDate += ''
		if (liveDate.length === 1) {
			return liveDate = '0' + liveDate
		} else {
			return Number(liveDate)
			} 
		}

	dateStart() {
		
		if (this.$inputD.value !== ''
		&& this.$inputM.value !== ''
		&& this.$inputY.value !== ''
		&& this.$inputD.value.length === 2
		&& this.$inputM.value.length === 2
		&& this.$inputY.value.length === 4) {
			// localStorage.setItem('input-start-value-D', this.$inputD.value);
			// localStorage.setItem('input-start-value-M', this.$inputM.value);
			// localStorage.setItem('input-start-value-Y', this.$inputY.value);
			return `${this.$inputD.value}.${this.$inputM.value}.${this.$inputY.value}`
			
		} else {
			return false
		}
	}
	

	dateEnd() {
		// const renderDateEnd = ()=> {

		// }

		if (this.isLoad === true) {
			if (this.$inputEndD.value !== ''
			&& this.$inputEndM.value !== ''
			&& this.$inputEndY.value !== ''
			&& this.$inputEndD.value.length === 2
			&& this.$inputEndM.value.length === 2
			&& this.$inputEndY.value.length === 4) {
				return `${this.$inputEndD.value}.${this.$inputEndM.value}.${this.$inputEndY.value}`
			} else if (this.$inputEndD.value === ''
						&& this.$inputEndM.value === ''
						&& this.$inputEndY.value === ''){
				return 'current'
			} else if (this.$inputEndD.value.length !== 2
						|| this.$inputEndM.value.length !== 2
						|| this.$inputEndY.value.length !== 4){
				return 'error'
			}
		}
	}

	// inputsIterration(mod) {
	// 	this.$el.forEach((i)=> {
	// 		i.mod
	// 	})
	// }

	eventBtns() {
		const $elBtns = document.querySelectorAll('.btn')
		const $dbd = document.querySelector('.days-between-dates')
		const resultDbd = document.querySelector('.result-render-dbd');
		$elBtns.forEach((i)=> {
			console.log(i);
			i.addEventListener('click', (e)=> {
				if (e.target.dataset.btn === 'clear-start') {
					this.$inputD.value = '';
					this.$inputM.value = '';
					this.$inputY.value = '';
					// $dbd.innerHTML = ''
					console.log('this.$el.innerHTML', this.$el.innerHTML);
					console.log('this.$el', this.$el);
					this.localStorageClear('start')
					this.ifRenderResultDbd()
				} else if (e.target.dataset.btn === 'clear-end') {
					this.$inputEndD.value = '';
					this.$inputEndM.value = '';
					this.$inputEndY.value = '';

					this.$inputEndD.placeholder = this.currentEndD;
					this.$inputEndM.placeholder = this.currentEndM;
					// this.$inputEndY.placeholder = this.currentEndY;

					// $dbd.innerHTML = ''
					this.localStorageClear('end')
					this.ifRenderResultDbd()
				} else if (e.target.closest(`[data-btn="clear-result"]`)) {
						console.log(e.target);
						console.log(resultDbd);
						// if (resultDbd) {
						// }
						// $dbd.classList.add('resultFadeOut');
						// // resultDbd.classList.add('resultFadeOut');
						// $dbd.addEventListener('animationend', ()=> {
						// 	$dbd.classList.remove('resultFadeOut')
						// }) 
						$dbd.innerHTML = '';
						this.resultDbdVisible = false
						localStorage.setItem('resultDbdVisible', this.resultDbdVisible)
					}
			})
		})
	}

	setPlaceholder(evenTarget, count) {
		const originalPlaceholder = evenTarget.getAttribute('placeholder');

		if (evenTarget.getAttribute('placeholder') === originalPlaceholder) {
			evenTarget.setAttribute('placeholder', '');
		}
		evenTarget.addEventListener('blur', () => {
			if (evenTarget.getAttribute('placeholder') === '') {
				evenTarget.setAttribute('placeholder', originalPlaceholder);
			}
		})
	}


	setChekbox() {
		const classNameChecked = 'checked'

		// window.addEventListener('load', () => {
			if (this.$checkedFirstDay.checked === true || localStorage.getItem('includingFirstDay') === 'true') {
				this.$checkedFirstDay.parentNode.classList.add(classNameChecked)
				this.includingFirstDay = true
			} 
			if (this.$checkedFirstDay.checked === false || localStorage.getItem('includingFirstDay') === 'false') {
				this.$checkedFirstDay.parentNode.classList.remove(classNameChecked)
				this.includingFirstDay = false
			}
			
			if (this.$checkedLastDay.checked === true || localStorage.getItem('includingLastDay') === 'true') {
				this.$checkedLastDay.parentNode.classList.add(classNameChecked)
				this.includingLastDay = true
			} 
			if (this.$checkedLastDay.checked === false || localStorage.getItem('includingLastDay') === 'false') {
				this.$checkedLastDay.parentNode.classList.remove(classNameChecked)
				this.includingLastDay = false
			}
		// })

		

		this.btnsSettings.addEventListener('input', (e)=> {
			const setClassNameChekbox = (dataName, includingDay) => {
				if (e.target.dataset.inputSetting === dataName) {
					if (e.target.checked) {
						e.target.parentNode.classList.add(classNameChecked)

						if (includingDay === 1) {
							this.includingFirstDay = true
							localStorage.setItem('includingFirstDay', this.includingFirstDay);
						}
						if (includingDay === 2) {
							this.includingLastDay = true
							localStorage.setItem('includingLastDay', this.includingLastDay);
						}

					} else {
						e.target.parentNode.classList.remove(classNameChecked)
						if (includingDay === 1) {
							this.includingFirstDay = false
							localStorage.setItem('includingFirstDay', this.includingFirstDay);
						}
						if (includingDay === 2) {
							this.includingLastDay = false
							localStorage.setItem('includingLastDay', this.includingLastDay);
						}
					}
				}
			}

			setClassNameChekbox('first-day', 1)
			console.log('this.includingFirstDay', this.includingFirstDay);

			setClassNameChekbox('last-day', 2)
			console.log('this.includingLastDay', this.includingLastDay);

		})
	}

	// boolCheckedFirstDay() {
	// 		if (this.$checkedFirstDay.checked = true) {
	// 			this.includingFirstDay = true
	// 		} else {
	// 			this.includingFirstDay = false
	// 		}
	// 	console.log('this.includingFirstDay', this.includingFirstDay);

	// }

	// boolCheckedLastDay() {
	// 		if (this.$checkedLastDay.checked = true) {
	// 			this.includingLastDay = true
	// 		} else {
	// 			this.includingLastDay = false
	// 		}
	// 	console.log('this.includingLastDay', this.includingLastDay);

	// }

	isloadPage() {
		
		// window.addEventListener('load', (e)=> {
		// 	this.isLoad = true
		// 	console.error('isLoad = true', isLoad);
		// 	console.error('isLoad e', e);
		// })
	}

	errorInpust() {
		let countItems = 0
		const errorNameClass = 'error-result-dbd'

		

		
		console.log('this.dateEnd() === error', this.dateEnd());
		this.$el.forEach((i)=> {
			countItems += 1
			
			const errorInput = (mod, err)=> {
				i.classList.add('error-inputs')
				// i.classList.add('tittle-error-dnone')npm run dev
				this.$dbdTextRender.innerHTML = ''
				// resultRenderHtml('.days-between-dates', {
				// 	isError: true,
				// 	errorClassName: 'error-result-dbd',
				// 	errorMessage: 'Поле початкової дати міститить надто мало символів!!!'
				// })
				i.addEventListener('animationend', () => {
					i.classList.remove('error-inputs');
					// if (typeof mod !== 'string') {
						// this.$dbdTextRender.innerHTML = ''
					// }
				});
				
				if (mod === 'Error > 13M') {
					resultRenderHtml('.days-between-dates', {
						isError: true,
						errorClassName: 'error-result-dbd',
						errorMessage: 'Кількість місяців у році не може перевищувати 12!'
					})
				} 
				this.$dbdTextRender.classList.add(errorNameClass)
			}
			
			
			
			if (this.isLoad === true) {
				if (countItems === 2 && Number(i.value) > 12
					|| countItems === 5 && Number(i.value) > 12) {
					console.log('countItems === 2 && Number(i.value) > 12');
					errorInput('Error > 13M', i.value)
					// return
				}
	
				if (this.dateStart() === false) {
					if (i.value.length < 2 && countItems <= 2) { //! errorInpust Start date
						errorInput()
					} else if (i.value.length < 4 && countItems === 3) {
						errorInput()
					}
				}
	
				if (this.dateEnd() === 'error') {
					if (i.value.length < 2 && countItems >= 4 && countItems <= 5) { //! errorInpust End date
						console.error('errrrrrooorrrr blinking last twooo======================='); //?= =======================
						console.warn('i.value.length < 2 && countItems <= 5');
					errorInput()
					} else if (i.value.length < 4 && countItems === 6) {
						// this.$dbdTextRender.innerHTML = 'Помилка введення!!!'
						errorInput()
					}
				}

			}



			// return 
		}) 
	}


}