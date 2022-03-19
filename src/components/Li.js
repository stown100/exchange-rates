import React from 'react'

function Li({ obj, newObj, previousObj }) {
    const oldVal = Object.values(previousObj[0].Valute)
    const arrVal = Object.values(obj[1].Valute);
    const newArr = Object.values(newObj[0].rates);

    const nominalTest = (item) => {
        if (item.Nominal === 10000) return item.Value / 10000
        if (item.Nominal === 1000) return item.Value / 1000
        if (item.Nominal === 100) return item.Value / 100
        if (item.Nominal === 10) return item.Value / 10
        else return item.Value
    }

    // Расчёт процента, изменения предыдущего курса с сегодняшним
    const res = newArr.map(item => (
        <p key={Math.random()}>{item}</p>
    ))
    const res2 = arrVal.map(item => (
        <p className='li__number tooltip' value={item.Name} data-tooltip={item.Name} key={Math.random()}>{nominalTest(item)}</p>
    ))

    const arr1 = []
    for (let i = 0; i < res.length; i++) {
        const num1 = res[i].props.children // цифры из массива сегодняшних значений
        arr1.push(num1)
    }
    const arr2 = []
    for (let i = 0; i < res2.length; i++) {
        const num2 = res2[i].props.children; // цифры из массива предыдущих значений
        arr2.push(num2)
    }
    const arr3 = []
    for (let i = 0; i < arr1.length; i++) {
        const result = ((arr1[i] * arr2[i] * arr2[i]) * 100 / arr2[i]) - 100
        arr3.push(result.toFixed(4))
    }


    // Работа с alertОМ
    const comparisons = oldVal.map(item => (
        <p className='li__number tooltip' value={item.Name} data-tooltip={item.Name} key={Math.random()}>{item}</p>
    ))

    const arrCom = []
    for (let i = 0; i < comparisons.length; i++) {
        arrCom.push(comparisons[i].props.children.Value)
    }

    let arrComparisons = []
    function differencePopup(index) {
        for (let i = 0; i < arrCom.length; i++) {
            arrComparisons.push((arrCom[i] - arr2[i]))
        }
        return alert(`За 10 дней разница в рублях составила: ${arrComparisons[index].toFixed(4)}`);

    }
    return (
        <>
            <ul className="tabble__title">
                <li className="tabble-list-li">Код валюты</li>
                <li className="tabble-list-li">Значение в рублях</li>
                <li className="tabble-list-li">Разница в %</li>
            </ul>
            <ul className='tabble__numbers'>
                <li className='li li-code'>
                    {arrVal.map((item, index) => (
                        <div className='li-block' key={Math.random()}>
                            <p className='li__number tooltip' key={Math.random()} data-tooltip={item.Name}
                                onClick={() => differencePopup(index)}>
                                {item.NumCode}
                            </p>
                            <p className='li__number tooltip' value={item.Name} data-tooltip={item.Name} key={Math.random()}
                                onClick={() => differencePopup(index)}>
                                {item.Value}
                            </p>
                        </div>
                    ))}
                </li>
                <li className='li li-percent'>
                    {arr3.map((item, index) => (
                        <p className={`tooltip ${item > 0 ? 'li__number li__number_green' : 'li__number_red'}`} data-tooltip={item}
                            key={Math.random()} onClick={() => differencePopup(index)}>{item}</p>
                    ))}
                </li>
            </ul>
        </>
    )
}

export default Li