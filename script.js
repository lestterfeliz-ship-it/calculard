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
        TASAS Y TOPES UTILIZADOS PARA 2026.

        AFP trabajador: 2.87%
        SFS trabajador: 3.04%

        Tope AFP: RD$464,460
        Tope SFS: RD$232,230
    */


    const topeAFP =
        464460;

    const topeSFS =
        232230;


    const afp =
        Math.min(
            salario,
            topeAFP
        ) * 0.0287;


    const sfs =
        Math.min(
            salario,
            topeSFS
        ) * 0.0304;


    const base =
        salario -
        afp -
        sfs;


    const anual =
        base * 12;


    let isr =
        0;


    /* =====================================
       ESCALA ISR
    ===================================== */

    if (anual <= 416220) {

        isr =
            0;

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


    document.getElementById(
        "neto"
    ).innerText =
        formatoDinero(neto);


    document.getElementById(
        "bruto"
    ).innerText =
        formatoDinero(salario);


    document.getElementById(
        "afp"
    ).innerText =
        "-" + formatoDinero(afp);


    document.getElementById(
        "sfs"
    ).innerText =
        "-" + formatoDinero(sfs);


    document.getElementById(
        "isr"
    ).innerText =
        "-" + formatoDinero(
            isrMensual
        );


    document.getElementById(
        "resultado-salario"
    ).style.display =
        "block";

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
        cuota *
        numeroPagos;


    const intereses =
        totalPagar -
        monto;


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
    ).style.display =
        "block";

}


/* =========================================
   CALCULADORA DE LIQUIDACIÓN
========================================= */

function calcularLiquidacion() {

    const salario =
        parseFloat(
            document.getElementById(
                "salarioLiquidacion"
            ).value
        ) || 0;


    const fechaIngreso =
        document.getElementById(
            "fechaIngreso"
        ).value;


    const fechaSalida =
        document.getElementById(
            "fechaSalida"
        ).value;


    const recibioPreaviso =
        document.getElementById(
            "preaviso"
        ).value;


    const incluirCesantia =
        document.getElementById(
            "incluirCesantia"
        ).value;


    const vacacionesTomadas =
        document.getElementById(
            "vacacionesTomadas"
        ).value;


    const incluirNavidad =
        document.getElementById(
            "incluirNavidad"
        ).value;


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
        new Date(
            fechaIngreso + "T00:00:00"
        );


    const salida =
        new Date(
            fechaSalida + "T00:00:00"
        );


    if (salida <= ingreso) {

        alert(
            "La fecha de salida debe ser posterior a la fecha de ingreso."
        );

        return;
    }


    const MS_DIA =
        1000 * 60 * 60 * 24;


    /* =====================================
       FECHAS UTC
    ===================================== */

    const ingresoUTC =
        Date.UTC(
            ingreso.getFullYear(),
            ingreso.getMonth(),
            ingreso.getDate()
        );


    const salidaUTC =
        Date.UTC(
            salida.getFullYear(),
            salida.getMonth(),
            salida.getDate()
        );


    const diasTrabajados =
        Math.floor(
            (
                salidaUTC -
                ingresoUTC
            ) /
            MS_DIA
        );


    const mesesTrabajados =
        diasTrabajados /
        30.4375;


    const anosTrabajados =
        diasTrabajados /
        365.25;


    /* =====================================
       SALARIO DIARIO
    ===================================== */

    const salarioDiario =
        salario /
        23.83;


    /* =====================================
       PREAVISO
    ===================================== */

    let diasPreaviso =
        0;


    if (
        mesesTrabajados >= 3 &&
        mesesTrabajados < 6
    ) {

        diasPreaviso =
            7;

    }

    else if (
        mesesTrabajados >= 6 &&
        mesesTrabajados < 12
    ) {

        diasPreaviso =
            14;

    }

    else if (
        mesesTrabajados >= 12
    ) {

        diasPreaviso =
            28;

    }


    let preaviso =
        0;


    if (
        recibioPreaviso === "no"
    ) {

        preaviso =
            salarioDiario *
            diasPreaviso;

    }


    /* =====================================
       CESANTÍA
    ===================================== */

    let diasCesantia =
        0;


    if (
        incluirCesantia === "si"
    ) {

        if (
            mesesTrabajados >= 3 &&
            mesesTrabajados < 6
        ) {

            diasCesantia =
                6;

        }

        else if (
            mesesTrabajados >= 6 &&
            mesesTrabajados < 12
        ) {

            diasCesantia =
                13;

        }

        else if (
            mesesTrabajados >= 12
        ) {

            const anosCompletos =
                Math.floor(
                    mesesTrabajados /
                    12
                );


            const mesesRestantes =
                mesesTrabajados -
                (
                    anosCompletos *
                    12
                );


            if (
                anosCompletos <= 5
            ) {

                diasCesantia =
                    anosCompletos *
                    21;

            }

            else {

                diasCesantia =
                    (5 * 21) +
                    (
                        (
                            anosCompletos -
                            5
                        ) *
                        23
                    );

            }


            if (
                mesesRestantes >= 3 &&
                mesesRestantes < 6
            ) {

                diasCesantia +=
                    6;

            }

            else if (
                mesesRestantes >= 6
            ) {

                diasCesantia +=
                    13;

            }

        }

    }


    const cesantia =
        salarioDiario *
        diasCesantia;


    /* =====================================
       VACACIONES
    ===================================== */

    let vacaciones =
        0;


    if (
        vacacionesTomadas === "no"
    ) {

        let diasVacaciones =
            0;


        if (
            anosTrabajados >= 1 &&
            anosTrabajados < 5
        ) {

            diasVacaciones =
                14;

        }

        else if (
            anosTrabajados >= 5
        ) {

            diasVacaciones =
                18;

        }

        else if (
            mesesTrabajados >= 6 &&
            mesesTrabajados < 7
        ) {

            diasVacaciones =
                7;

        }

        else if (
            mesesTrabajados >= 7 &&
            mesesTrabajados < 8
        ) {

            diasVacaciones =
                8;

        }

        else if (
            mesesTrabajados >= 8 &&
            mesesTrabajados < 9
        ) {

            diasVacaciones =
                9;

        }

        else if (
            mesesTrabajados >= 9 &&
            mesesTrabajados < 10
        ) {

            diasVacaciones =
                10;

        }

        else if (
            mesesTrabajados >= 10 &&
            mesesTrabajados < 11
        ) {

            diasVacaciones =
                11;

        }

        else if (
            mesesTrabajados >= 11
        ) {

            diasVacaciones =
                12;

        }


        vacaciones =
            salarioDiario *
            diasVacaciones;

    }


    /* =====================================
       SALARIO DE NAVIDAD
    ===================================== */

    let navidad =
        0;


    if (
        incluirNavidad === "si"
    ) {

        const anoSalida =
            salida.getFullYear();


        const inicioAno =
            new Date(
                anoSalida,
                0,
                1
            );


        const inicioCalculo =
            ingreso > inicioAno
                ? ingreso
                : inicioAno;


        const inicioCalculoUTC =
            Date.UTC(
                inicioCalculo.getFullYear(),
                inicioCalculo.getMonth(),
                inicioCalculo.getDate()
            );


        /*
            +1 porque tanto el día inicial
            como el día final forman parte
            del período trabajado.
        */

        const diasDevengados =
            Math.floor(
                (
                    salidaUTC -
                    inicioCalculoUTC
                ) /
                MS_DIA
            ) + 1;


        const esBisiesto =
            (
                anoSalida % 4 === 0 &&
                anoSalida % 100 !== 0
            ) ||
            (
                anoSalida % 400 === 0
            );


        const diasAno =
            esBisiesto
                ? 366
                : 365;


        /*
            ESTIMACIÓN PARA SALARIO
            MENSUAL CONSTANTE.

            Ejemplo:
            01/01/2025 al 31/12/2025
            = 365 días.

            RD$30,000 × 365 / 365
            = RD$30,000.
        */

        navidad =
            salario *
            (
                diasDevengados /
                diasAno
            );


        if (
            navidad > salario
        ) {

            navidad =
                salario;

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
        formatoDinero(
            preaviso
        );


    document.getElementById(
        "cesantiaLiquidacion"
    ).innerText =
        formatoDinero(
            cesantia
        );


    document.getElementById(
        "vacacionesLiquidacion"
    ).innerText =
        formatoDinero(
            vacaciones
        );


    document.getElementById(
        "navidadLiquidacion"
    ).innerText =
        formatoDinero(
            navidad
        );


    document.getElementById(
        "totalLiquidacion"
    ).innerText =
        formatoDinero(
            total
        );


    document.getElementById(
        "resultado-liquidacion"
    ).style.display =
        "block";

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
        dolares *
        tasa;


    document.getElementById(
        "resultadoDolar"
    ).innerText =
        formatoDinero(
            resultado
        );


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


    if (
        ingresos <= 0
    ) {

        alert(
            "Escribe tus ingresos mensuales."
        );

        return;
    }


    if (
        gastos < 0
    ) {

        alert(
            "Los gastos no pueden ser negativos."
        );

        return;
    }


    const disponible =
        ingresos -
        gastos;


    document.getElementById(
        "disponible"
    ).innerText =
        formatoDinero(
            disponible
        );


    document.getElementById(
        "ingresosResultado"
    ).innerText =
        formatoDinero(
            ingresos
        );


    document.getElementById(
        "gastosResultado"
    ).innerText =
        formatoDinero(
            gastos
        );


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


    if (
        salario <= 0
    ) {

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
        ) /
        12;


    document.getElementById(
        "regaliaResultado"
    ).innerText =
        formatoDinero(
            regalia
        );


    document.getElementById(
        "resultado-regalia"
    ).style.display =
        "block";

}


/* =========================================
   NUEVO CÁLCULO - SALARIO
========================================= */

function limpiarSalario() {

    document.getElementById(
        "salario"
    ).value = "";


    document.getElementById(
        "otros"
    ).value = "";


    document.getElementById(
        "resultado-salario"
    ).style.display =
        "none";


    document.getElementById(
        "salario"
    ).focus();

}


/* =========================================
   NUEVO CÁLCULO - PRÉSTAMO
========================================= */

function limpiarPrestamo() {

    document.getElementById(
        "montoPrestamo"
    ).value = "";


    document.getElementById(
        "tasaPrestamo"
    ).value = "";


    document.getElementById(
        "plazoPrestamo"
    ).value = "";


    document.getElementById(
        "resultado-prestamo"
    ).style.display =
        "none";


    document.getElementById(
        "montoPrestamo"
    ).focus();

}


/* =========================================
   NUEVO CÁLCULO - LIQUIDACIÓN
========================================= */

function limpiarLiquidacion() {

    document.getElementById(
        "salarioLiquidacion"
    ).value = "";


    document.getElementById(
        "fechaIngreso"
    ).value = "";


    document.getElementById(
        "fechaSalida"
    ).value = "";


    document.getElementById(
        "preaviso"
    ).value =
        "no";


    document.getElementById(
        "incluirCesantia"
    ).value =
        "si";


    document.getElementById(
        "vacacionesTomadas"
    ).value =
        "no";


    document.getElementById(
        "incluirNavidad"
    ).value =
        "si";


    document.getElementById(
        "resultado-liquidacion"
    ).style.display =
        "none";


    document.getElementById(
        "salarioLiquidacion"
    ).focus();

}


/* =========================================
   NUEVO CÁLCULO - DÓLAR
========================================= */

function limpiarDolar() {

    document.getElementById(
        "dolares"
    ).value = "";


    document.getElementById(
        "tasaDolar"
    ).value = "";


    document.getElementById(
        "resultado-dolar"
    ).style.display =
        "none";


    document.getElementById(
        "dolares"
    ).focus();

}


/* =========================================
   NUEVO CÁLCULO - PRESUPUESTO
========================================= */

function limpiarPresupuesto() {

    document.getElementById(
        "ingresos"
    ).value = "";


    document.getElementById(
        "gastos"
    ).value = "";


    document.getElementById(
        "resultado-presupuesto"
    ).style.display =
        "none";


    document.getElementById(
        "ingresos"
    ).focus();

}


/* =========================================
   NUEVO CÁLCULO - REGALÍA
========================================= */

function limpiarRegalia() {

    document.getElementById(
        "salarioRegalia"
    ).value = "";


    document.getElementById(
        "mesesRegalia"
    ).value = "";


    document.getElementById(
        "resultado-regalia"
    ).style.display =
        "none";


    document.getElementById(
        "salarioRegalia"
    ).focus();

}


/* =========================================
   MENSAJE INICIAL
========================================= */

console.log(
    "CalculaRD cargado correctamente."
);