export const buildInitials = (fullName: string) => {
  const first = fullName.split(" ").shift()?.charAt(0);
  const last = fullName.split(" ").pop()?.charAt(0);
  let sigla = " ";

  if (first && last) {
    sigla = first + last;
  }

  return sigla.toUpperCase();
};

interface DataStatus {
  valor: string;
  status: "orange" | "green" | "blue";
}

export function calcularDistanciaData(data: Date): DataStatus {
  const agora = new Date();
  const diferenca = Math.abs(agora.getTime() - data.getTime());
  const segundos = Math.floor(diferenca / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(dias / 365);

  let valor: string;
  let status: "orange" | "green" | "blue";

  if (anos > 0) {
    valor = `Em ${anos} ano${anos > 1 ? "s" : ""}`;
    status = "blue";
  } else if (meses > 0) {
    valor = `Em ${meses} mês${meses > 1 ? "es" : ""}`;
    status = "blue";
  } else if (semanas > 0) {
    valor = `Em ${semanas} semana${semanas > 1 ? "s" : ""}`;
    status = "blue";
  } else if (dias > 0) {
    if (dias === 1) {
      valor = "Amanhã";
    } else if (dias === 2) {
      valor = "Terça-feira";
    } else if (dias === 3) {
      valor = "Quarta-feira";
    } else if (dias === 4) {
      valor = "Quinta-feira";
    } else if (dias === 5) {
      valor = "Sexta-feira";
    } else if (dias === 6) {
      valor = "Sábado";
    } else if (dias === 7) {
      valor = "Domingo";
    } else {
      valor = `Em ${dias} dia${dias > 1 ? "s" : ""}`;
    }
    status = "green";
  } else if (horas > 0) {
    valor = `Em ${horas} hora${horas > 1 ? "s" : ""}`;
    status = "green";
  } else if (minutos > 0) {
    valor = `Em ${minutos} minuto${minutos > 1 ? "s" : ""}`;
    status = "green";
  } else if (segundos > 0) {
    valor = `Em ${segundos} segundo${segundos > 1 ? "s" : ""}`;
    status = "green";
  } else {
    valor = "Agora";
    status = "green";
  }

  if (data < agora) {
    valor = `Atrasado`;
    status = "orange";
  }

  return { valor, status };
}
