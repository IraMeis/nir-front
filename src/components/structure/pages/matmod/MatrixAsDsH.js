import React, {useContext} from "react";
import MatmodContext from "../../../context/MatmodContext";
import Separator from "../../Separator";

export default function MatrixAsDsH(){
    const matmod = useContext(MatmodContext);
    return (
        <>
            <Separator.Separator2/>

            <div className="row">
                <div className={'col'}/>
                <div className={'col'}>
                    <div className={'text-center'}>
                        <label htmlFor="delay">
                            <h5>As: </h5>
                        </label>
                    </div>
                    {matmod.As.map((elem, index) => (
                        <div className={'my-auto row'}>
                            <input
                                className="form-control"
                                type="number"
                                name="delay"
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    let mas = matmod.As.slice();
                                    mas[index] = n;
                                    matmod.setAs(mas)
                                }}
                                value={matmod.As[index]}
                            />
                        </div>))
                    }
                </div>
                <div className={'col'}/>
                <div className={'col'}>
                    <div className={'text-center'}>
                        <label htmlFor="delay">
                            <h5>Ds: </h5>
                        </label>
                    </div>
                    {matmod.Ds.map((elem, index) => (
                        <div className={'my-auto row'}>
                            <input
                                className="form-control"
                                type="number"
                                name="delay"
                                onChange={(event) => {
                                    const n = Number(event.target.value)
                                    let mas = matmod.Ds.slice();
                                    mas[index] = n;
                                    matmod.setDs(mas)
                                }}
                                value={matmod.Ds[index]}
                            />
                        </div>))
                    }
                </div>
                <div className={'col'}/>
            </div>

            <Separator.Separator3/>

            <div className="row ">
                <div className={'col-md-1'}/>
                <div className={'col-md-10'}>
                    <div className={'text-center'}>
                        <label htmlFor="delay">
                            <h5>Matrix: </h5>
                        </label>
                    </div>

                    {matmod.matrix.map((elem, i) => (
                        <div className={'my-auto row'}>
                            {matmod.matrix[i].map((elemj, j) => (
                                <div className={'my-auto col'}>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="delay"
                                        onChange={(event) => {
                                            const n = Number(event.target.value);
                                            let newMatr = matmod.matrix.slice();
                                            let masi = matmod.matrix[i].slice();
                                            masi[j] = n;
                                            newMatr[i] = masi;
                                            matmod.setMatrix(newMatr);
                                        }}
                                        value={matmod.matrix[i][j]}
                                    />
                                </div>))}
                        </div>))}
                </div>
                <div className={'col-md-1'}/>
            </div>

            <Separator.Separator3/>

            <div className="row ">
                <div className={'col-md-1'}/>
                <div className={'col-md-10'}>
                    <div className="row ">
                        <div className={'col text-center'}>
                            <label><h5>{'It:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'It'}
                                value={matmod.It}
                                onChange={matmod.handleChangeIt}/>
                        </div>
                        <div className={'col text-center'}>
                            <label><h5>{'Ix:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'Ix'}
                                value={matmod.Ix}
                                onChange={matmod.handleChangeIx}/>
                        </div>
                        <div className={'col text-center'}>
                            <label><h5>{'Iy:'}</h5></label>
                            <input
                                className="form-control"
                                type="number"
                                name={'Iy'}
                                value={matmod.Iy}
                                onChange={matmod.handleChangeIy}/>
                        </div>
                    </div>
                </div>
                <div className={'col-md-1'}/>
            </div>

            <Separator.Separator3/>
        </>
    );
}