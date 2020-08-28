var table = document.querySelector(".main-table");

var div = document.querySelector(".pagination");

var start = 0;

function CreateTable(data, start, value) {
	console.log(value);
	for (var i = (value - 1) * 10; i < (value - 1) * 10 + 10; i++) {
		var serialNo = i;
		var bookName = data[i].title;
		var language = data[i].language;
		var author = data[i].author;
		var country = data[i].country;
		var year = data[i].year;
		var link = data[i].link;
		var page = data[i].pages;

		table.innerHTML += `<tr class='books'>
            <td>${serialNo}</td>
            <td>${bookName}</td>
            <td>${language}</td>
            <td>${author}</td>
            <td>${country}</td>
            <td>${year}</td>
            <td><a href="${link}">Wikipedia</a></td>
            <td>${page}</td>
            </tr>`;
		// console.log(link)
	}
	return i;
}

var baseURL = `http://www.json-generator.com/api/json/get/cpGScyQNLm?indent=2`;
fetch(baseURL)
	.then(function(response) {
		return response.json();
	})
	.then(function(responseData) {
		console.log(responseData);
		var data = responseData;
		div.addEventListener("click", function(event) {
			event.preventDefault();
			console.log(event.target.innerText);
			if (document.querySelector(".books") !== null) {
				console.log("I ma here");
				var books = document.querySelectorAll(".books");

				for (var i = 0; i < books.length; i++) {
					books[i].remove();
				}
			}
			start = CreateTable(data, start, parseInt(event.target.innerText));
			// console.log(start);
		});
	})
	.catch(function(error) {
		console.log(error);
	});
