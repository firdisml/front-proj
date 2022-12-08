
export function useDate() {

    function convertStringToDate(item) {
        const [dateValues, timeValues] = item.split(' ');
        const [day, month, year] = dateValues.split('-');
        const [hours, minutes, seconds] = timeValues.split(':');

        return new Date(+year, month - 1, +day, +hours, +minutes, +seconds)
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function format24hour(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var sec = date.getSeconds();
        var strTime = hours + ':' + minutes + ':' + sec;
        return strTime;
    }

    function formatDateOnly(date) {
        var year = date.getFullYear();
        var mes = date.getMonth() + 1;
        var dia = date.getDate();
        return dia + "/" + mes + "/" + year;
    }

    function compareIRangeoftimeoverlap(d1, d2, d3, d4) {
        let a = convertStringToDate(d1)
        let b = convertStringToDate(d2)
        let c = convertStringToDate(d3)
        let d = convertStringToDate(d4)
        if (a.getTime() < d.getTime() && b.getTime() > c.getTime()) {
            console.log('This one overlap: ', d1);
            console.log('with interval: ', d3);
            console.log('----');
            return true;
        }

        return false
    }

    function daysDifferent(dateA, dateB) {
        var Difference_In_Time = dateB.getTime() - dateA.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        return Difference_In_Days
    }

    return {
        convertStringToDate,
        formatAMPM,
        format24hour,
        formatDateOnly,
        compareIRangeoftimeoverlap,
        daysDifferent

    }
}



