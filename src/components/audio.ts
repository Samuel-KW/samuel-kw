
import { zzfx } from '../components/utils/ZzFX';

function wrapper (data: (number | undefined)[]) {
    return () => zzfx(...data);
}

export const sound = {
    success: wrapper([1.1,,626,.01,.04,.2,,1.2,,,244,.1,.02,,,,,.79,.02,,792]), // TODO Update
    warning: wrapper([.4,,304,,,.02,,4.1,,,,,,,50,,,.71,.02,.04]),
    error: wrapper([5,,130,,.01,,,2.5,,,,,,,245,1.5,,,,,1]),
    type: wrapper([0.2,,1e3,,,.01,,,,,100,,,,60]),
    interact: wrapper([,,227,,.03,.05,,,,-5,50,.03,.02,,,,,,,.19]),
    click: wrapper([1.5,,850,,,.009,,.5,,10,,,,,,,,.85]),
    disabled: wrapper([,,368,.01,.01,.02,,1.1,-20,-6,-206,.47,,,,,,.89,.03])
}