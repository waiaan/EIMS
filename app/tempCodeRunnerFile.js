b.query('select * from employees', function (err, result) {
  if (err) throw new Error(err);
  console.log(result);
})
