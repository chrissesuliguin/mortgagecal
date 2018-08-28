export const calculator = ({
  interestRate = 0,
  tenure = 20,
  loan = 0
}) => {
    const rated = (interestRate / 100) / 12;
    const monthlyLoanDenom = Math.pow((1 + rated), (tenure * 12)) - 1;
    const monthlyLoanNomin = rated * (Math.pow((1 + rated), (tenure * 12)));
    const monthlyLoan = loan * (monthlyLoanNomin / monthlyLoanDenom);
    const interestVal =  loan * rated;
    const principleVal = monthlyLoan - interestVal;

    return {
      interestRate: interestRate,
      monthlyLoan: monthlyLoan,
      interestVal: interestVal,
      principleVal: principleVal,
    }
};

export default calculator;
