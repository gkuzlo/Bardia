
I think you should use an
<iframe src="http://www.wp.pl" style="width:300px; height:300px"></iframe>

# UI.BorderLayout
~~~javascript
	var layout = new UI.BorderLayout({
		inside: mat.getMaterial(),
		south: {
			height: 50
		}
	});
~~~

# UI.Material
~~~javascript
	var material = new UI.Material({
		inside: h.getMaterial(),
		position: "top:20px; left:100px; width:600px; height:600px"
	});
~~~

# UI.ProgressBar
~~~javascript
	var progress = new UI.ProgressBar({
		inside: layout.getSouth()
	});
~~~
Atrybuty

Nazwa | Typ | Domyślnie | Wymagany | Opis
:----- | :--- | :--------- | :----- | :---
inside | HTMLElement | | Tak | Element HTML, w którym umieszczony zostanie komponent
totalColor | String | #000000 | | Kolor paska
doneColor | String | #00FF00 | | Kolor postępu

Metody

Nazwa | ParaOpis |
:----- | :--- | 
setProgress | postęp zaawansowania (Integer 0 - 100)
setLabel    | Ustawia etykietę na paskiem
