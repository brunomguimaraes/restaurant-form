export const validate = (values: any, step: number) => {
    const error: any = {};
    if(!values.mealType && step === 0){
        error.mealType = 'Select a meal'
    }
  
    if((values.quantityOfPeople < 1 || values.quantityOfPeople > 10) && step === 0){
        error.quantityOfPeople = 'Enter a valid number'
    
    }

    if(!values.restaurant && step === 1){
      error.restaurant = 'Select a restaurant'
    }

    return error;
  };

export default validate;