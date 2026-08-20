/* =========================================
   CALCULARD - FUNCIONES
========================================= */


/* =========================================
   FORMATO DE DINERO
========================================= */

function formatoDinero(numero) {

    return new Intl.NumberFormat(
        "es-DO",
        {
            style: "currency",
            currency: "DOP",
            maximumFractionDigits: 0
        }
    ).format(numero);

}


/* =========================================
   MOSTRAR CALCULADORA
========================================= */

function mostrarCalculadora(tipo) {

    const id =
        "calculadora-" + tipo;

    const elemento =
        document.getElementById(id);

    if (!elemento) {

        console.error(
            "No se encontró:",
            id
        );

        return;
    }

    elemento.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   CALCULADORA DE SALARIO
========================================= */

function calcularSalario() {

    const campoSalario =
        document.getElementById("salario");

    const campoOtros =
        document.getElementById("otros");


    const salario =
        parseFloat(campoSalario.value) || 0;

    const otros =
        parseFloat(campoOtros.value) || 0;


    if (salario <= 0) {

        alert(
            "Escribe tu salario bruto mensual."
        );

        campoSalario.focus();

        return;
    }


    /*
        ESTIMACIÓN INICIAL.

        Antes de publicar oficialmente
        debemos validar tasas, topes y
        reglas vigentes en RD.
    */


    const topeAFP = 464460;
const topeSFS = 232230;

const afp =
    Math.min(salario, topeAFP) * 0.0287;

const sfs =
    Math.min(salario, topeSFS) * 0.0304;


    const base =
        salario -
        afp -
        sfs;


    const anual =
        base * 12;


    let isr = 0;


    if (anual <= 416220) {

        isr = 0;

    }

    else if (anual <= 624329) {

        isr =
            (anual - 416220) *
            0.15;

    }

    else if (anual <= 867123) {

        isr =
            31216 +
            (
                (anual - 624329) *
                0.20
            );

    }

    else {

        isr =
            79776 +
            (
                (anual - 867123) *
                0.25
            );

    }


    const isrMensual =
        isr / 12;


    const neto =
        salario -
        afp -
        sfs -
        isrMensual +
        otros;


    document.getElementById("neto").innerText =
        formatoDinero(neto);


    document.getElementById("bruto").innerText =
        formatoDinero(salario);


    document.getElementById("afp").innerText =
        "-" + formatoDinero(afp);


    document.getElementById("sfs").innerText =
        "-" + formatoDinero(sfs);


    document.getElementById("isr").innerText =
        "-" + formatoDinero(isrMensual);


    document.getElementById(
        "resultado-salario"
    ).style.display = "block";

}


/* =========================================
   CALCULADORA DE PRÉSTAMOS
========================================= */

function calcularPrestamo() {

    const monto =
        parseFloat(
            document.getElementById(
                "montoPrestamo"
            ).value
        ) || 0;


    const tasaAnual =
        parseFloat(
            document.getElementById(
                "tasaPrestamo"
            ).value
        ) || 0;


    const plazoAnios =
        parseFloat(
            document.getElementById(
                "plazoPrestamo"
            ).value
        ) || 0;


    if (
        monto <= 0 ||
        tasaAnual <= 0 ||
        plazoAnios <= 0
    ) {

        alert(
            "Completa el monto, la tasa y el plazo."
        );

        return;
    }


    const tasaMensual =
        (
            tasaAnual / 100
        ) / 12;


    const numeroPagos =
        plazoAnios * 12;


    const cuota =
        monto *
        (
            tasaMensual *
            Math.pow(
                1 + tasaMensual,
                numeroPagos
            )
        )
        /
        (
            Math.pow(
                1 + tasaMensual,
                numeroPagos
            ) - 1
        );


    const totalPagar =
        cuota * numeroPagos;


    const intereses =
        totalPagar - monto;


    document.getElementById(
        "cuotaPrestamo"
    ).innerText =
        formatoDinero(cuota);


    document.getElementById(
        "montoResultado"
    ).innerText =
        formatoDinero(monto);


    document.getElementById(
        "interesesPrestamo"
    ).innerText =
        formatoDinero(intereses);


    document.getElementById(
        "totalPrestamo"
    ).innerText =
        formatoDinero(totalPagar);


    document.getElementById(
        "resultado-prestamo"
    ).style.display = "block";

}


/* =========================================
   CALCULADORA DE LIQUIDACIÓN
========================================= */

function calcularLiquidacion() {

    const salario =
        parseFloat(
            document.getElementById("salarioLiquidacion").value
        ) || 0;

    const fechaIngreso =
        document.getElementById("fechaIngreso").value;

    const fechaSalida =
        document.getElementById("fechaSalida").value;

    const recibioPreaviso =
        document.getElementById("preaviso").value;

    const incluirCesantia =
        document.getElementById("incluirCesantia").value;

    const vacacionesTomadas =
        document.getElementById("vacacionesTomadas").value;

    const incluirNavidad =
        document.getElementById("incluirNavidad").value;


    if (
        salario <= 0 ||
        !fechaIngreso ||
        !fechaSalida
    ) {

        alert(
            "Completa el salario y las dos fechas."
        );

        return;
    }


    const ingreso =
        new Date(fechaIngreso + "T00:00:00");

    const salida =
        new Date(fechaSalida + "T00:00:00");


    if (salida < ingreso) {

        alert(
            "La fecha de salida debe ser igual o posterior a la fecha de ingreso."
        );

        return;
    }


    const MS_DIA =
        1000 * 60 * 60 * 24;


    /* =====================================
       ANTIGÜEDAD CALENDARIO
    ===================================== */

    let anosCompletos =
        salida.getFullYear() -
        ingreso.getFullYear();

    let aniversario =
        new Date(
            salida.getFullYear(),
            ingreso.getMonth(),
            ingreso.getDate()
        );

    if (salida < aniversario) {
        anosCompletos--;
    }

    if (anosCompletos < 0) {
        anosCompletos = 0;
    }


    const fechaUltimoAniversario =
        new Date(
            ingreso.getFullYear() + anosCompletos,
            ingreso.getMonth(),
            ingreso.getDate()
        );


    let mesesRestantes =
        (
            salida.getFullYear() -
            fechaUltimoAniversario.getFullYear()
        ) * 12 +
        (
            salida.getMonth() -
            fechaUltimoAniversario.getMonth()
        );

    if (
        salida.getDate() <
        fechaUltimoAniversario.getDate()
    ) {
        mesesRestantes--;
    }

    if (mesesRestantes < 0) {
        mesesRestantes = 0;
    }


    const mesesTotales =
        anosCompletos * 12 +
        mesesRestantes;


    /* =====================================
       SALARIO DIARIO
    ===================================== */

    const salarioDiario =
        salario / 23.83;


    /* =====================================
       PREAVISO
    ===================================== */

    let diasPreaviso = 0;

    if (
        mesesTotales >= 3 &&
        mesesTotales < 6
    ) {
        diasPreaviso = 7;
    }

    else if (
        mesesTotales >= 6 &&
        mesesTotales < 12
    ) {
        diasPreaviso = 14;
    }

    else if (mesesTotales >= 12) {
        diasPreaviso = 28;
    }


    let preaviso = 0;

    if (recibioPreaviso === "no") {
        preaviso =
            salarioDiario *
            diasPreaviso;
    }


    /* =====================================
       CESANTÍA
    ===================================== */

    let diasCesantia = 0;

    if (incluirCesantia === "si") {

        if (
            mesesTotales >= 3 &&
            mesesTotales < 6
        ) {
            diasCesantia = 6;
        }

        else if (
            mesesTotales >= 6 &&
            mesesTotales < 12
        ) {
            diasCesantia = 13;
        }

        else if (anosCompletos >= 1) {

            if (anosCompletos <= 5) {
                diasCesantia =
                    anosCompletos * 21;
            }

            else {
                diasCesantia =
                    (5 * 21) +
                    (
                        (anosCompletos - 5) *
                        23
                    );
            }


            if (
                mesesRestantes >= 3 &&
                mesesRestantes < 6
            ) {
                diasCesantia += 6;
            }

            else if (
                mesesRestantes >= 6
            ) {
                diasCesantia += 13;
            }
        }
    }


    const cesantia =
        salarioDiario *
        diasCesantia;


    /* =====================================
       VACACIONES
    ===================================== */

    let vacaciones = 0;

    if (vacacionesTomadas === "no") {

        let diasVacaciones = 0;

        if (
            anosCompletos >= 1 &&
            anosCompletos < 5
        ) {
            diasVacaciones = 14;
        }

        else if (anosCompletos >= 5) {
            diasVacaciones = 18;
        }

        else if (
            anosCompletos === 0 &&
            mesesTotales > 5
        ) {

            if (mesesTotales === 6) {
                diasVacaciones = 7;
            }

            else if (mesesTotales === 7) {
                diasVacaciones = 8;
            }

            else if (mesesTotales === 8) {
                diasVacaciones = 9;
            }

            else if (mesesTotales === 9) {
                diasVacaciones = 10;
            }

            else if (mesesTotales === 10) {
                diasVacaciones = 11;
            }

            else if (mesesTotales >= 11) {
                diasVacaciones = 12;
            }
        }


        vacaciones =
            salarioDiario *
            diasVacaciones;
    }


    /* =====================================
       SALARIO DE NAVIDAD
    ===================================== */

    let navidad = 0;

    if (incluirNavidad === "si") {

        const inicioAno =
            new Date(
                salida.getFullYear(),
                0,
                1
            );

        const inicioCalculo =
            ingreso > inicioAno
                ? ingreso
                : inicioAno;

        const diasDevengados =
            Math.floor(
                (
                    salida -
                    inicioCalculo
                ) / MS_DIA
            ) + 1;

        navidad =
            salario *
            12 *
            (
                diasDevengados /
                365.25
            ) / 12;

        if (navidad > salario) {
            navidad = salario;
        }
    }


    /* =====================================
       TOTAL
    ===================================== */

    const total =
        preaviso +
        cesantia +
        vacaciones +
        navidad;


    document.getElementById(
        "preavisoLiquidacion"
    ).innerText =
        formatoDinero(preaviso);

    document.getElementById(
        "cesantiaLiquidacion"
    ).innerText =
        formatoDinero(cesantia);

    document.getElementById(
        "vacacionesLiquidacion"
    ).innerText =
        formatoDinero(vacaciones);

    document.getElementById(
        "navidadLiquidacion"
    ).innerText =
        formatoDinero(navidad);

    document.getElementById(
        "totalLiquidacion"
    ).innerText =
        formatoDinero(total);

    document.getElementById(
        "resultado-liquidacion"
    ).style.display = "block";
}

/* =========================================
   CONVERSOR USD → RD$
========================================= */

function convertirDolar() {

    const dolares =
        parseFloat(
            document.getElementById(
                "dolares"
            ).value
        ) || 0;


    const tasa =
        parseFloat(
            document.getElementById(
                "tasaDolar"
            ).value
        ) || 0;


    if (
        dolares <= 0 ||
        tasa <= 0
    ) {

        alert(
            "Completa la cantidad de dólares y la tasa de cambio."
        );

        return;
    }


    const resultado =
        dolares * tasa;


    document.getElementById(
        "resultadoDolar"
    ).innerText =
        formatoDinero(resultado);


    document.getElementById(
        "resultado-dolar"
    ).style.display =
        "block";

}


/* =========================================
   PRESUPUESTO PERSONAL
========================================= */

function calcularPresupuesto() {

    const ingresos =
        parseFloat(
            document.getElementById(
                "ingresos"
            ).value
        ) || 0;


    const gastos =
        parseFloat(
            document.getElementById(
                "gastos"
            ).value
        ) || 0;


    if (ingresos <= 0) {

        alert(
            "Escribe tus ingresos mensuales."
        );

        return;
    }


    if (gastos < 0) {

        alert(
            "Los gastos no pueden ser negativos."
        );

        return;
    }


    const disponible =
        ingresos - gastos;


    document.getElementById(
        "disponible"
    ).innerText =
        formatoDinero(disponible);


    document.getElementById(
        "ingresosResultado"
    ).innerText =
        formatoDinero(ingresos);


    document.getElementById(
        "gastosResultado"
    ).innerText =
        formatoDinero(gastos);


    document.getElementById(
        "resultado-presupuesto"
    ).style.display =
        "block";

}


/* =========================================
   REGALÍA PASCUAL
========================================= */

function calcularRegalia() {

    const salario =
        parseFloat(
            document.getElementById(
                "salarioRegalia"
            ).value
        ) || 0;


    const meses =
        parseFloat(
            document.getElementById(
                "mesesRegalia"
            ).value
        ) || 0;


    if (salario <= 0) {

        alert(
            "Escribe tu salario mensual."
        );

        return;
    }


    if (
        meses <= 0 ||
        meses > 12
    ) {

        alert(
            "Los meses trabajados deben estar entre 1 y 12."
        );

        return;
    }


    const regalia =
        (
            salario *
            meses
        ) / 12;


    document.getElementById(
        "regaliaResultado"
    ).innerText =
        formatoDinero(regalia);


    document.getElementById(
        "resultado-regalia"
    ).style.display =
        "block";

}


/* =========================================
   NUEVO CÁLCULO - SALARIO
========================================= */

function limpiarSalario() {

    // Limpiar los campos
    document.getElementById("salario").value = "";
    document.getElementById("otros").value = "";

    // Ocultar todo el resultado
    document.getElementById(
        "resultado-salario"
    ).style.display = "none";

    // Volver al campo salario
    document.getElementById("salario").focus();
}


/* =========================================
   MENSAJE INICIAL
========================================= */

console.log(
    "CalculaRD cargado correctamente."
);
/* =========================================
   NUEVO CÁLCULO - PRÉSTAMO
========================================= */

function limpiarPrestamo() {

    // Limpiar campos
    document.getElementById("montoPrestamo").value = "";
    document.getElementById("tasaPrestamo").value = "";
    document.getElementById("plazoPrestamo").value = "";

    // Ocultar todo el resultado
    document.getElementById(
        "resultado-prestamo"
    ).style.display = "none";

    // Volver al primer campo
    document.getElementById("montoPrestamo").focus();
}
/* =========================================
   NUEVO CÁLCULO - LIQUIDACIÓN
========================================= */

function limpiarLiquidacion() {

    document.getElementById("salarioLiquidacion").value = "";
    document.getElementById("fechaIngreso").value = "";
    document.getElementById("fechaSalida").value = "";

    document.getElementById("preaviso").value = "no";
    document.getElementById("incluirCesantia").value = "si";
    document.getElementById("vacacionesTomadas").value = "no";
    document.getElementById("incluirNavidad").value = "si";

    document.getElementById(
        "resultado-liquidacion"
    ).style.display = "none";

    document.getElementById(
        "salarioLiquidacion"
    ).focus();
}
/* =========================================
   NUEVO CÁLCULO - DÓLAR
========================================= */

function limpiarDolar() {

    document.getElementById("dolares").value = "";
    document.getElementById("tasaDolar").value = "";

    document.getElementById(
        "resultado-dolar"
    ).style.display = "none";

    document.getElementById("dolares").focus();
}
/* =========================================
   NUEVO CÁLCULO - PRESUPUESTO
========================================= */

function limpiarPresupuesto() {

    document.getElementById("ingresos").value = "";
    document.getElementById("gastos").value = "";

    document.getElementById(
        "resultado-presupuesto"
    ).style.display = "none";

    document.getElementById("ingresos").focus();
}
/* =========================================
   NUEVO CÁLCULO - REGALÍA
========================================= */

function limpiarRegalia() {

    document.getElementById("salarioRegalia").value = "";
    document.getElementById("mesesRegalia").value = "";

    document.getElementById(
        "resultado-regalia"
    ).style.display = "none";

    document.getElementById("salarioRegalia").focus();
}