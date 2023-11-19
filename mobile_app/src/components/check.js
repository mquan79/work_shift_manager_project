export const checkRegister = (register, workers, registers) => {
    const worker = workers.find((item) => item.phone === register.phone);
    const reg = registers.find((item) => item.phone === register.phone)
    const birthday = new Date(register.birthday)
    const today = new Date();
    const age = today.getFullYear() - birthday.getFullYear() + 1;

    if(worker || reg) {
        return 'Số điện thoại tồn tại'
    } else if(age < 18) {
        return 'Bạn chưa đủ tuổi để làm việc'
    } else if(age > 60){
        return 'Bạn đã quá tuổi có thể làm việc'
    } else {
        return '';
    }
    
}

export const checkNumberPhone = (phone) => {
    var vnf_regex = /((\+84|0)+([3|5|7|8|9])+([0-9]{8})\b)/g;
    return vnf_regex.test(phone);
  };
  
