import Separator from "../../Separator";
import RunButtons from "./RunButtons";
import ModelParams from "./ModelParams";
import Lims from "./Lims";
import ImageField from "./ImageField";

export default function MainConfig () {
    return (
        <div className={'container'}>
            <ModelParams/>
            <Separator.Separator1/>
            <Lims/>
            <Separator.Separator4/>
            <RunButtons/>
            <Separator.Separator1/>
            <ImageField/>
            <Separator.Separator3/>
        </div>
    );
}