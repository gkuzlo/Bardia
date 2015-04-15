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
