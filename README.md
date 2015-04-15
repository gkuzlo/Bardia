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

Nazwa | Typ | Domyślnie | Wymagany | Opis
----- | --- | --------- | ----- | ---
inside | HTMLElement | | Tak | Element HTML, w którym umieszczony zostanie komponent
totalColor | String | #000000 | | Kolor paska
doneColor | String | #00FF00 | | Kolor postępu

