define(['common/trialConstant', 'common/trialUtil'], function(TrialConstant, TrialUtil) {
    //var inputObj = {
    //    inputRegisterYear : 2014,
    //    inputCarPrice : 240215,
    //    inputCount : 2
    //};
    //
    var defaultObj = {
        'carAmount' : 5,
        'depreciationRate' : 0.0060,
        'galssType' : '国产玻璃',
        'dangerCoefficient' : 0.85,
        'discount' : 0.75,
        'thirdPartyInsured' : '50万',
        'driverInsured' : '10000',
        'passengerInsured' : '10000'
    };

    var convertStr2Float = function(str) {
        return parseFloat(str.toFixed(2));
    };

    var getHhCarPrice = function(inputCarPrice) {
        if (inputCarPrice / 50 > 1) {
            return '50'; //单位万
        } else if (inputCarPrice / 30 > 1){
            return '30';
        } else {
            return '0';
        }
    };

    var getCSYearRange = function(carYear) {
        if (carYear >= 0 && carYear < 1) {
            return 0;
        }
        if (carYear >= 1 && carYear < 3) {
            return 1;
        }
        if (carYear >= 3 && carYear < 4) {
            return 3;
        }
        if (carYear >= 4 && carYear < 6) {
            return 4;
        }
        if (carYear >= 6 && carYear < 8) {
            return 6;
        }
        if (carYear >= 8) {
            return 8;
        }
    };

    var getZRYearRange = function(carYear) {
        if (carYear >= 0 && carYear < 2) {
            return 0;
        }
        if (carYear >= 2 && carYear < 4) {
            return 2;
        }
        if (carYear >= 4 && carYear < 6) {
            return 4;
        }
        if (carYear >= 6 ) {
            return 6;
        }
    };
    var csPremium = function(inputObj) { //车损保费
        var carYear = TrialUtil.getCarYear(inputObj.inputRegisterYear);
        var csParams = TrialConstant.cs[getCSYearRange(carYear)];

        var premium = parseInt((csParams.criterionFee + inputObj.inputCarPrice  * csParams.rate) * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : parseInt(premium * TrialConstant.bjmpxs.cs)
        }
    };
    var szPremium = function(inputObj) { //三者保费
        var premium = parseInt(TrialConstant.dsfzrx[defaultObj.thirdPartyInsured] * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : parseInt(premium * TrialConstant.bjmpxs.sz)
        }
    };
    var sjPremium = function(inputObj) { //司机保费
        var premium = parseInt((defaultObj.driverInsured * TrialConstant.csryzrx.sj) * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : parseInt(premium * TrialConstant.bjmpxs.sj)
        }
    };
    var ckPremium = function(inputObj) { //乘客保费
        var premium = parseInt((defaultObj.driverInsured * TrialConstant.csryzrx.ck * 4) * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : parseInt(premium * TrialConstant.bjmpxs.ck)
        }
    };
    var dqPremium = function(inputObj) { //盗抢保费
        console.log(TrialUtil.getDepreciationCarPrice(inputObj.inputCarPrice, inputObj.inputRegisterYear));
        var premium = parseInt((TrialConstant.dqx.criterionFee + TrialUtil.getDepreciationCarPrice(inputObj.inputCarPrice, inputObj.inputRegisterYear) * TrialConstant.dqx.rate) * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : parseInt(premium * TrialConstant.bjmpxs.dq)
        }
    };
    var hhPremium = function(inputObj) { //划痕保费
        var hhInsured = getHhCarPrice(inputObj.inputCarPrice / 10000);
        var carYear = TrialUtil.getCarYear(inputObj.inputRegisterYear);
        if (carYear < 2) {
            carYear = '2-';
        } else {
            carYear = '2+';
        }
        var premium = parseInt((TrialConstant.cshhssx[hhInsured][carYear][TrialConstant.default.hhInsured]) * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : parseInt(premium * TrialConstant.bjmpxs.hh)
        }
    };
    var zrPremium = function(inputObj) { //自燃保费
        var carYear = TrialUtil.getCarYear(inputObj.inputRegisterYear) > 3 ? 4 : TrialUtil.getCarYear(inputObj.inputRegisterYear);
        var premium = parseInt((TrialUtil.getDepreciationCarPrice(inputObj.inputCarPrice, inputObj.inputRegisterYear) * TrialConstant.zrxs[getZRYearRange(carYear)]) * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : parseInt(premium * TrialConstant.bjmpxs.zr)
        }
    };
    var blPremium = function(inputObj) { // 玻璃保费
        var premium = parseInt((inputObj.inputCarPrice * TrialConstant.blddpsx.gcbl) * TrialConstant.cxxs[inputObj.inputCount]);
        return {
            premium : premium,
            nonDeductible : 0
        }
    };
    var getSYCPremium = function(premium){
        return premium * defaultObj.discount;
    };
    var calcModeResult = function(inputObj , type){
        var mode = {
            carPrice : '',
            carYear : '',
            count : '',
            type : '',
            cs : '',
            cs_bjmp : '',
            sz : '',
            sz_bjmp : '',
            sj : '',
            sj_bjmp : '',
            ck : '',
            ck_bjmp : '',
            dq : '',
            dq_bjmp : '',
            hh : '',
            hh_bjmp : '',
            zr : '',
            zr_bjmp : '',
            bl : '',
            bl_bjmp : '',
            bjmp : '',
            total: '',
            discountTotal : ''
        };
        //
        mode.carPrice = inputObj.inputCarPrice * 100;//单位分
        mode.carYear = inputObj.inputRegisterYear;
        mode.count = inputObj.inputCount;

        if (type == 0 ) {//simple
            mode.type = 1;
            mode.cs = csPremium(inputObj).premium;
            mode.cs_bjmp = csPremium(inputObj).nonDeductible;
            mode.sz = szPremium(inputObj).premium;
            mode.sz_bjmp = szPremium(inputObj).nonDeductible;
            mode.bjmp = convertStr2Float(csPremium(inputObj).nonDeductible + szPremium(inputObj).nonDeductible);
            mode.total = parseInt(mode.cs + mode.sz + mode.bjmp);
            mode.discountTotal = getSYCPremium(mode.total);
        } else if (type == 1) { //normal
            mode.type = 2;
            mode.cs = csPremium(inputObj).premium;
            mode.cs_bjmp = csPremium(inputObj).nonDeductible;
            mode.sz = szPremium(inputObj).premium;
            mode.sz_bjmp = szPremium(inputObj).nonDeductible;
            mode.sj = sjPremium(inputObj).premium;
            mode.sj_bjmp = sjPremium(inputObj).nonDeductible;
            mode.ck = ckPremium(inputObj).premium;
            mode.ck_bjmp = ckPremium(inputObj).nonDeductible;
            mode.dq = dqPremium(inputObj).premium;
            mode.dq_bjmp = dqPremium(inputObj).nonDeductible;
            mode.bjmp =convertStr2Float(
                csPremium(inputObj).nonDeductible +
                szPremium(inputObj).nonDeductible +
                sjPremium(inputObj).nonDeductible +
                ckPremium(inputObj).nonDeductible +
                dqPremium(inputObj).nonDeductible);
            mode.total =
                parseInt(mode.cs + mode.sz + mode.sj + mode.ck + mode.dq + mode.bjmp);
            mode.discountTotal = getSYCPremium(mode.total);
        } else { //Luxury
            mode.type = 3;
            mode.cs = csPremium(inputObj).premium;
            mode.cs_bjmp = csPremium(inputObj).nonDeductible;
            mode.sz = szPremium(inputObj).premium;
            mode.sz_bjmp = szPremium(inputObj).nonDeductible;
            mode.sj = sjPremium(inputObj).premium;
            mode.sj_bjmp = sjPremium(inputObj).nonDeductible;
            mode.ck = ckPremium(inputObj).premium;
            mode.ck_bjmp = ckPremium(inputObj).nonDeductible;
            mode.dq = dqPremium(inputObj).premium;
            mode.dq_bjmp = dqPremium(inputObj).nonDeductible;
            mode.hh = hhPremium(inputObj).premium;
            mode.hh_bjmp = hhPremium(inputObj).nonDeductible;
            mode.zr = zrPremium(inputObj).premium;
            mode.zr_bjmp = zrPremium(inputObj).nonDeductible;
            mode.bl = blPremium(inputObj).premium;
            mode.bl_bjmp = blPremium(inputObj).nonDeductible;
            mode.bjmp =convertStr2Float(
                csPremium(inputObj).nonDeductible +
                szPremium(inputObj).nonDeductible +
                sjPremium(inputObj).nonDeductible +
                ckPremium(inputObj).nonDeductible +
                dqPremium(inputObj).nonDeductible +
                hhPremium(inputObj).nonDeductible +
                zrPremium(inputObj).nonDeductible +
                blPremium(inputObj).nonDeductible);
            mode.total =
                parseInt(mode.cs + mode.sz + mode.sj + mode.ck + mode.dq + mode.hh + mode.zr + mode.bl + mode.bjmp);
            mode.discountTotal = getSYCPremium(mode.total);
        }
        return mode;
    };

    return {
        calcResult : function(inputObj){
            var mode = [];
            var simpleMode = calcModeResult(inputObj, 0);
            var normalMode = calcModeResult(inputObj, 1);
            var luxuryMode = calcModeResult(inputObj, 2);
            mode.push(normalMode);
            mode.push(simpleMode);
            mode.push(luxuryMode);
            return mode;
        }

    }
});
