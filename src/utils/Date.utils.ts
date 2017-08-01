
export class DateUtils{


  constructor(){}

/**
 * 
 * @param timeTemp date in numeric
 * @returns returns day info, e.g. "hoje", "amanhã", "ontem" or null
 */
public getDayInfo(timeTemp : number) : string{

  let time = new Date(timeTemp);
  let today = new Date();
  let yesterday =  new Date();
  let tomorrow = new Date();

  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  if(new Date(time).setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
    return "(hoje)";
  }
  else if(new Date(time).setHours(0,0,0,0) == tomorrow.setHours(0,0,0,0)){
    return "(amanhã)";
  }
  else if(new Date(time).setHours(0,0,0,0) == yesterday.setHours(0,0,0,0)){
    return "(ontem)";
  }

  return null;
}

  /**
   * 
   * @param str ISOString
   * returns a date already converted using local time
   */
parseISOLocal(str){
  var b = str.split(/\D/);
  return new Date(b[0], b[1]-1, b[2], b[3], b[4], b[5]);
}

}