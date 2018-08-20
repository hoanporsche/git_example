export const isPhoneNumber = (value) => {
  const newValue = value.toString().trim();
  /**Kiểm tra xem độ dài có từ 8 đến 11 ký tự không
   * có phải là number không, ký tự đầu tiên có bằng 0 không
  */
  return (newValue.length < 8 || newValue.length > 11 || 
          isNaN(newValue) || newValue.charAt(0) !== '0' ) ? 
          'Số điện thoại phải từ 8 đến 11 ký tự và bắt đầu bằng số 0' : true;
     
}