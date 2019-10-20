export const validate = (values: any) => {
    const error: any = {};
    if(!values.mealType){
        error.mealType = 'Select a meal'
      }
      if(values.quantityOfPeople < 1 || values.quantityOfPeople > 10 ){
        error.quantityOfPeople = 'Enter a valid number'
      }
    return error;
  };

export default validate;