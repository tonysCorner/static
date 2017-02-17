define(['common/trialConstant'], function(TrialConstant) {

    var getCarRegister = function(inputRegisterYear) { //车辆初登日
        return {
            y : inputRegisterYear,
            m : (new Date().getMonth() + 1),
            d : 1
        };
    };
    var getEffectiveDateOfInsurance = function () { //保险生效日
        return {
            y : new Date().getFullYear(),
            m : (new Date().getMonth() + 1),
            d : 1
        };
    };
    var getDepreciationMonth = function(inputRegisterYear) { //折旧月份
        var cr = getCarRegister(inputRegisterYear);
        var ed = getEffectiveDateOfInsurance();
        return 12 - cr.m + (ed.y - cr.y - 1) * 12 + ed.m;
    };

    return {
        getCarYear : function (inputRegisterYear) { //车龄
            var cr = getCarRegister(inputRegisterYear);
            var ed = getEffectiveDateOfInsurance();
            return parseInt(ed.y - cr.y + (ed.m - cr.m) / 12 - 1) < 0 ? 0 : parseInt(ed.y - cr.y + (ed.m - cr.m) / 12 - 1);
        },
        getCsCarInsured : function (inputCarPrice){  //车损保额
            return inputCarPrice;
        },
        getDepreciationCarPrice : function(inputCarPrice, inputRegisterYear) { //
            if (TrialConstant.default.depreciationRate * getDepreciationMonth(inputRegisterYear) < 0.8 * inputCarPrice) {
                return inputCarPrice - TrialConstant.default.depreciationRate * getDepreciationMonth(inputRegisterYear) * inputCarPrice ;
            } else {
                return 0.2 * inputCarPrice;
            }
        }

    }
});