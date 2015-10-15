/**
 * 
 */
cesip.schedules.SchedulesData = bardia.oop.Class.create({
	/**
	 * 
	 */
	initialize: function(config) {
		bardia.oop.Class.extend(this, bardia.oop.Class.extend({
			tabs: []
		}, config));

        this.render();
	},
	
	/**
	 * 
	 */
	render: function() {
		var h = this;

        h.breadCrumb = new bardia.layout.BreadCrumb({
            inside: h.inside,
        });
        
        h.breadCrumb.addItem({
            name: "Zakresy danych",
            onActivate: function(html) {
                h.showStraps(html);
            }
        });
	},

	/**
	 *  
	 */
	showStraps: function(html) {
		var h = this;

		h.strapsGrid = new bardia.grid.Grid({
			inside: html,
			title: "Zakresy danych",
			columns: [
			    {
			    	name: "loid",
			    	property: "loid"
			    },
			    {
			    	name: "startDate",
			    	property: "startDate",
			    	render: function(row) {
			    		return cesip.schedules.SchedulesData.DU.createFormatYYYYMMDD(row.bean.startDate);
			    	}
			    },
			    {
			    	name: "endDate",
			    	property: "endDate",
			    	render: function(row) {
			    		return cesip.schedules.SchedulesData.DU.createFormatYYYYMMDD(row.bean.startDate);
			    	}
			    },
			    {
			    	name: "active",
			    	property: "active"
			    },
			],
			onClick: function(row) {
				var periodStr = cesip.schedules.SchedulesData.DU.createFormatYYYYMMDD(row.bean.startDate) + " " + cesip.schedules.SchedulesData.DU.createFormatYYYYMMDD(row.bean.endDate)

                h.breadCrumb.addItem({
                    name: "Okres: " + periodStr,
                    onActivate: function(_html) {
                        h.showSchedules(_html, row.bean);
                    }
                });
			},
			buttons: [
			    {
			    	name: "refresh",
			    	icon: "refresh",
			    	onClick: function() {
			    		h.fetchStraps();			    		
			    	}
			    }
			]
		});

		h.fetchStraps();
	},
	
	/**
	 * 
	 */
	fetchStraps: function() {
		var h = this;
		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.strapsGrid.fetch({
					rows: model.straps
				});
			},
			onFailure: function() {
				
			}
		});
		rest.getStraps();
	},
	
	/**
	 *  
	 */
	showSchedules: function(html, strap) {
		var h = this;

		h.schedulesGrid = new bardia.grid.Grid({
			inside: html,
			title: "Rozkłady",
			columns: [
			    {
			    	name: "loid",
			    	property: "loid"
			    },
			    {
			    	name: "startDate",
			    	property: "startDate",
			    	render: function(row) {
			    		return cesip.schedules.SchedulesData.DU.createFormatYYYYMMDD(row.bean.startDate);
			    	}
			    },
			    {
			    	name: "endDate",
			    	property: "endDate",
			    	render: function(row) {
			    		return cesip.schedules.SchedulesData.DU.createFormatYYYYMMDD(row.bean.endDate);
			    	}
			    },
			    {
			    	name: "line",
			    	property: "line.name"
			    },
			    {
			    	name: "dayType",
			    	width: 300,
			    	property: "line.name",
			    	render: function(row) {
			    		var result = "";
			    			var dayTypes = [];
			    			row.bean.dayTypes.forEach(function(dayType) {
			    				dayTypes.push(dayType.name);
			    			});
			    			result = dayTypes.join(",");
			    		return result;
			    	}
			    },
			],
			onClick: function(row) {
                h.breadCrumb.addItem({
                    name: "Schedule: " + row.bean.loid,
                    onActivate: function(_html) {
                        h.showTasks(_html, row.bean);
                    }
                });
			},
			buttons: [
			    {
			    	name: "refresh",
			    	icon: "refresh",
			    	onClick: function() {
			    		h.fetchSchedules(strap);
			    	}
			    }
			]
		});

		h.fetchSchedules(strap);
	},
	
	/**
	 *  
	 */
	fetchSchedules: function(strap) {
		var h = this;
		
		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.schedulesGrid.fetch({
					rows: model.schedules
				});
			},
			onFailure: function() {
				
			}
		});
		rest.getSchedulesForStrap(strap);
	},
	/**
	 * 
	 */
	showTasks: function(html, schedule) {
		var h = this;

		h.tasksGrid = new bardia.grid.Grid({
			inside: html,
			title: "Zadania",
			columns: [
			    {
			    	name: "loid",
			    	property: "loid"
			    },
			    {
			    	name: "name",
			    	property: "name"
			    },
			],
			onClick: function(row) {
                h.breadCrumb.addItem({
                    name: "Task: " + row.bean.name,
                    onActivate: function(_html) {
                        h.showCourses(_html, row.bean);
                    }
                });
			},
			buttons: [
			    {
			    	name: "refresh",
			    	icon: "refresh",
			    	onClick: function() {
			    		h.fetchTasks(schedule);
			    	}
			    }
			]
		});

		h.fetchTasks(schedule);
	},
	/**
	 *  
	 */
	fetchTasks: function(schedule) {
		var h = this;
		
		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.tasksGrid.fetch({
					rows: model.tasks
				});
			},
			onFailure: function() {
				
			}
		});
		rest.getTasksForSchedule(schedule);
	},
	/**
	 * 
	 * @param html
	 * @param task
	 */
	showCourses: function(html, task) {
		var h = this;

		h.coursesGrid = new bardia.grid.Grid({
			inside: html,
			title: "Kursy",
			columns: [
			    {
			    	name: "loid",
			    	property: "loid"
			    },
			    {
			    	name: "startTimeSec",
			    	property: "startTimeSec",
			    	render: function(row) {
			    		return cesip.schedules.SchedulesData.DU.daySecondsToHHMM(row.bean.startTimeSec);
			    	}
			    },
			    {
			    	name: "endTimeSec",
			    	property: "endTimeSec",
			    	render: function(row) {
			    		return cesip.schedules.SchedulesData.DU.daySecondsToHHMM(row.bean.endTimeSec);
			    	}
			    },
			    {
			    	name: "name",
			    	property: "name"
			    },
			    {
			    	name: "Wariant",
			    	property: "wariant",
			    	render: function(row) {
			    		var result = {};			    		
			    			var color = (row.bean.variant.correct==true)?"#007700":"#ff0000";

			    			result = {
			    				$_tag: "a",
			    				href: "#",
			    				style: "color:" + color + "; text-decoration:none; font-weight:bold",
			    				$_append: row.bean.variant.loid,
			    				$_on: {
			    					"click": function(e) {
					    				h.showVariant(row.bean.variant);
					    				e.stopPropagation();
			    					}
			    				}
			    			};
			    		return result;
			    	}
			    }
			],
			onClick: function(row) {
                h.breadCrumb.addItem({
                    name: "Course: " + row.bean.loid,
                    onActivate: function(_html) {
                        h.showStoppings(_html, row.bean);
                    }
                });
			},
			buttons: [
			    {
			    	name: "refresh",
			    	icon: "refresh",
			    	onClick: function() {
			    		h.fetchCourses(task);
			    	}
			    }
			]
		});

		h.fetchCourses(task);
	},
	/**
	 * 
	 */
	fetchCourses: function(task) {
		var h = this;

		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.coursesGrid.fetch({
					rows: model.courses
				});
			},
			onFailure: function() {

			}
		});
		rest.getCoursesForTask(task);
	},
	/**
	 * 
	 */
	showStoppings: function(html, course) {
		var h = this;

		h.stoppingsGrid = new bardia.grid.Grid({
			inside: html,
			title: "Odjazdy",
			columns: [
			    {
			    	name: "loid",
			    	property: "loid"
			    },
			    {
			    	name: "name",
			    	property: "name"
			    },
			    {
			    	name: "scheduledDepartureSec",
			    	property: "scheduledDepartureSec",
			    	render: function(row) {
			    		return cesip.schedules.SchedulesData.DU.daySecondsToHHMM(row.bean.scheduledDepartureSec);
			    	}
			    },
			    {
			    	name: "orderInCourse",
			    	property: "orderInCourse"
			    },
			    {
			    	name: "stopPoint",
			    	property: "variantStopping.stopPoint.symbol",
			    	width: 300,
			    	render: function(row) {
			    		return "(" + row.bean.variantStopping.stopPoint.symbol + ") " + row.bean.variantStopping.stopPoint.group.name;
			    	}
			    },
			],
			onClick: function(row) {
			},
			buttons: [
			    {
			    	name: "refresh",
			    	icon: "refresh",
			    	onClick: function() {
			    		h.fetchStoppings(course);
			    	}
			    }
			]
		});

		h.fetchStoppings(course);
	},
	/**
	 *  
	 */
	fetchStoppings: function(course) {
		var h = this;

		var rest = new cesip.rest.REST({
			onSuccess: function(model) {
				h.stoppingsGrid.fetch({
					rows: model.stoppings
				});
			},
			onFailure: function() {
				
			}
		});
		rest.getStoppingsForCourse(course);
	},
	/**
	 * 
	 */
	showVariant: function(variant) {
		var h = this;
		
        h.breadCrumb.addItem({
            name: "Variant: " + variant.loid,
            onActivate: function(_html) {
        		new cesip.schedules.VariantDetails({
        			inside: _html,
        			variant: variant
        		});
            }
        });
	}
});

cesip.schedules.SchedulesData.DU = new bardia.utils.DateUtils();