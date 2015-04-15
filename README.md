# UI.Material

# UI.BorderLayout
~~~javascript
	var layout = new UI.BorderLayout({
		inside: mat.getMaterial(),
		south: {
			height: 50
		}
	});
~~~

# UI.ProgressBar
~~~javascript
	var progress = new UI.ProgressBar({
		inside: layout.getSouth()
	});
~~~

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
