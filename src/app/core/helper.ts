export class Helper{

  public static getYears(){
    let year = 1980;
    let actualYear = new Date().getFullYear();
    let arrayYears = [];

    for (let index = year; year <= actualYear; index++) {
      let item = {
        title: index,
        value: index
      }
      arrayYears.push(item);
    }

    return arrayYears;
  }

}