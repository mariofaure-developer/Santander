export function FormatList(List: String[]) {

    var cleanList: String[] = [];
    var x: number = 0;
    const listLength: number = List.length;
    var formattedList: String = '';

    List.forEach(element => {
      let newElement = '';

      for (var i = 0; i < element.length; i++) {
        if (element.charAt(i) == element.charAt(i).toUpperCase() && i > 0){
          newElement += ' ' + element.charAt(i).toLowerCase();
        } else {
          if (x > 0){
            newElement += element.charAt(i).toLowerCase();
          } else {
            if (i > 0){
              newElement += element.charAt(i).toString();
            } else {
              newElement += element.charAt(i).toUpperCase();
            }
          }
        }
      }

      x += 1;

      if (listLength == x){
        if (x > 1){
          formattedList =  cleanList.join(', ').concat(' and ', newElement);
        } else {
          formattedList = newElement;
        }
      } else {
        cleanList.push(newElement);
      }

  });

  return formattedList;
}