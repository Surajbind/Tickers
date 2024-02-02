
fetch('http://localhost:3000/gettickers')
  .then(response => response.json())
  .then(data => {
    console.log(data[0].name);
    let tableData ="";
    data.map((values)=>{
        tableData += `<tr>
        <td>${values.id}</td>
        <td>${values.name}</td>
        <td>${values.last}</td>
        <td>${values.buy} / ${values.sell}</td>
        <td  class="volume-cell">${values.volume}</td>
        <td>${values.base_unit}</td>
      </tr>`;
    });

    document.getElementById('t-body').innerHTML = tableData;


  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
