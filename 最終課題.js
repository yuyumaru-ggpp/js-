document.getElementById("calculate").addEventListener("click", function () {
    let totalAmount = parseFloat(document.getElementById("totalAmount").value);
    let numPeople = parseInt(document.getElementById("numPeople").value);
    let extraAmount = parseFloat(document.getElementById("adjustAmount").value) || 0;
    let roundingMethod = document.getElementById("rounding").value;
    let resultField = document.getElementById("result");

    // バリデーション（入力値のチェック）
    if (isNaN(totalAmount) || totalAmount <= 0) {
        resultField.innerHTML = "総額を正しく入力してください。";
        return;
    }
    if (isNaN(numPeople) || numPeople <= 1) {
        resultField.innerHTML = "2人以上の人数を入力してください。";
        return;
    }
    if (extraAmount < 0) {
        resultField.innerHTML = "幹事の負担額は0円以上にしてください。";
        return;
    }

    // 幹事の基本負担額 + 追加負担額
    let organizerAmount = (totalAmount / numPeople) + extraAmount;
    
    // 他の人の負担額
    let remainingAmount = totalAmount - organizerAmount;
    let perPerson = remainingAmount / (numPeople - 1); // 幹事以外の1人分

    // 端数処理
    if (roundingMethod === "floor") {
        perPerson = Math.floor(perPerson);
        organizerAmount = totalAmount - perPerson * (numPeople - 1);
    } else if (roundingMethod === "ceil") {
        perPerson = Math.ceil(perPerson);
        organizerAmount = totalAmount - perPerson * (numPeople - 1);
    } else {
        perPerson = Math.round(perPerson);
        organizerAmount = totalAmount - perPerson * (numPeople - 1);
    }

    // 結果を表示
    resultField.innerHTML = `
        <strong>支払額</strong><br>
        一般の人: <span style="font-size: 18px; color: #007bff;">${perPerson} 円</span><br>
        幹事: <span style="font-size: 18px; color: #d9534f;">${organizerAmount} 円</span>
    `;
});

// クリアボタンの処理
document.getElementById("clear").addEventListener("click", function () {
    document.getElementById("totalAmount").value = "";
    document.getElementById("numPeople").value = "";
    document.getElementById("adjustAmount").value = "";
    document.getElementById("rounding").value = "round"; // 初期値にリセット
    document.getElementById("result").innerHTML = "";
});
