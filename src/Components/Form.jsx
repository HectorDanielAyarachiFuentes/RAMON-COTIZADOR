import { useState, useEffect } from "react";
import { Property } from "./Form/Property";
import { Location } from "./Form/Location";
import { Meters2 } from "./Form/Meters2";
import { Button } from "./Form/Button+Price";

export function Form() {
  const [selectPropiedad, setSelectPropiedad] = useState("...");
  const [selectUbicacion, setSelectUbicacion] = useState("...");
  const [inputMts2, setInputMts2] = useState(20);
  const [spanValorPoliza, setSpanValorPoliza] = useState("0.00");
  const costoM2 = 35.86;
  // Define estados para almacenar datos de categoría "ubicacion" y "propiedad"
  const [ubicacionData, setUbicacionData] = useState([]);
  const [propiedadData, setPropiedadData] = useState([]);

  useEffect(() => {
    fetch("/src/Components/datos.json")
      .then((response) => response.json())
      .then((data) => {
        const ubicacion = data.filter((item) => item.categoria === "ubicacion");
        const propiedad = data.filter((item) => item.categoria === "propiedad");

        setUbicacionData(ubicacion);
        setPropiedadData(propiedad);
      });
  }, []);

  return (
    <div className=" center div-cotizador">
      <h2 className="center separador">Completa los datos solicitados</h2>
      <Property datos={propiedadData} setPropiedad={setSelectPropiedad} />
      <Location datos={ubicacionData} setUbicacion={setSelectUbicacion} />
      <Meters2 inputMts2={inputMts2} setInputMts2={setInputMts2} />
      <Button
        propiedadData={propiedadData}
        selectPropiedad={selectPropiedad}
        ubicacionData={ubicacionData}
        selectUbicacion={selectUbicacion}
        inputMts2={inputMts2}
        costoM2={costoM2}
        spanValorPoliza={spanValorPoliza}
        setSpanValorPoliza={setSpanValorPoliza}
      />
    </div>
  );
}

export default Form;
