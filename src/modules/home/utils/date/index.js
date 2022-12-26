export const getChatTime = date => {
  const time = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${
    date.getMinutes() < 10 ? '0' : ''
  }${date.getMinutes()}:${date.getSeconds()}`;

  return time;
};

export const getChatDate = date => {
  const dates = date.getDate();
  const day = date.getDay() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let localeDay;
  let localeMonth;

  switch (day) {
    case 1:
      localeDay = 'Minggu';
      break;
    case 2:
      localeDay = 'Senin';
      break;
    case 3:
      localeDay = 'Selasa';
      break;
    case 4:
      localeDay = 'Rabu';
      break;
    case 5:
      localeDay = 'Kamis';
      break;
    case 6:
      localeDay = "Jum'at";
      break;
    case 7:
      localeDay = 'Sabtu';
      break;
  }

  switch (month) {
    case 1:
      localeMonth = 'Januari';
      break;
    case 2:
      localeMonth = 'Februari';
      break;
    case 3:
      localeMonth = 'Maret';
      break;
    case 4:
      localeMonth = 'April';
      break;
    case 5:
      localeMonth = 'Mei';
      break;
    case 6:
      localeMonth = 'Juni';
      break;
    case 7:
      localeMonth = 'Juli';
      break;
    case 8:
      localeMonth = 'Agustus';
      break;
    case 9:
      localeMonth = 'September';
      break;
    case 10:
      localeMonth = 'Oktober';
      break;
    case 11:
      localeMonth = 'November';
      break;
    case 12:
      localeMonth = 'Desember';
      break;
  }

  return `${localeDay}, ${dates} ${localeMonth} ${year}`;
};
