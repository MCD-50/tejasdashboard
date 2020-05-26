<template>
	<div class="base-div">
		<md-table-card>
			<md-card class="dashboard-card">
				<md-card-area>
					<md-card-header>
						<div class="md-title">Filter</div>
					</md-card-header>
					<md-card-content>
						<form>
							<label>Subscription Start *</label>
							<DatePicker v-model="payload.start"></DatePicker>

							<label>Subscription End *</label>
							<DatePicker v-model="payload.end"></DatePicker>

							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
							<br/>
						</form>
					</md-card-content>
				</md-card-area>
				<md-card-actions>
					<md-button @click="(e)=> getItems(1)">SUBMIT</md-button>
				</md-card-actions>
			</md-card>

			<md-table>
				<md-table-header>
					<md-table-row>
						<md-table-head v-for="(column, index) in Columns" :key="index" :md-sort-by="column">{{column}}</md-table-head>
					</md-table-row>
				</md-table-header>

				<md-table-body>
					<md-table-row v-for="(row, rowIndex) in Items" :key="rowIndex" :md-item="row">
						<md-table-cell style="alignItems:flex-start;">
							<md-button class="md-icon-button" @click="(e)=> view(e, row)">
								<md-icon>remove_red_eye</md-icon>
								<md-tooltip md-direction="top">View</md-tooltip>
							</md-button>
							<md-button class="md-icon-button" @click="(e)=> edit(e, row)">
								<md-icon>edit</md-icon>
								<md-tooltip md-direction="top">Edit</md-tooltip>
							</md-button>
						</md-table-cell>
						<md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex">
							<span v-html="column"></span>
						</md-table-cell>
					</md-table-row>
				</md-table-body>
			</md-table>

			<TablePagination :mdTotal="MaxResult" :mdSize="End" :mdPage="Current" :mdPageOptions="Limit" @pagination="onPagination" @size="onSizeChange"/>
		</md-table-card>
	</div>
</template>


<script>
import DatePicker from 'vuejs-datepicker';
import TablePagination from '../util/tablePagination.vue';

import * as internet from '../../../../helper/internet';
import * as constant from '../../../../helper/constant.js';
import * as collection from '../../../../helper/collection.js';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/viewCustomers");
	},

	mounted() {
		if (this.$store.getters.pageFor == constant.CUSTOMER) {
			this.options.current = this.$store.getters.appPreviousPage;
		}
	},

	data() {
		return {
			payload: {
				items: [],
				columns: [],

				start: new Date(),
				end: new Date()
			},
			helper: {
				isColumnRendered: false,
				isSearchBarVisible: false,
				selectedLimitIndex: 0,
				seletedItems: [],
				item: null,
				itemId: '',
				selectedFilters: [],
			},
			sortKey: {
				createdAt: '-1',
			},
			searchKey: {
				key: '',
				value: '',
				searchColumns: [
					{ key: 'Customer Id', value: 'customerId' },
					{ key: 'User Id', value: 'userId' },
					{ key: 'Name', value: 'name' },
					{ key: 'Mobile', value: 'mobile' },
					{ key: 'Email', value: 'email' },
					{ key: 'Market', value: 'allowed' },
					{ key: 'Type', value: 'type' },
					{ key: 'Relationship Manager', value: 'handler' },
				]
			},
			options: {
				current: 1,
				end: 0,
				maxResult: 0,
				limit: [20, 30, 50, 100, 500],
				sort: '_id',
			},
			error: {
				title: "Something went wrong",
				message: "Please check the network tab for more info.",
				okText: "OK",
				cancelText: "CANCEL"
			}
		}
	},
	components: {
		TablePagination,
		DatePicker
	},
	computed: {
		Items() {
			return this.payload.items;
		},
		Filters() {
			return this.helper.selectedFilters;
		},
		Columns() {
			return this.payload.columns;
		},
		SearchColumns() {
			return this.searchKey.searchColumns;
		},
		IsSearchBarVisible() {
			return this.helper.isSearchBarVisible;
		},
		MaxResult() {
			return this.options.maxResult;
		},
		Current() {
			return this.options.current;
		},
		Limit() {
			return this.options.limit;
		},
		End() {
			return this.options.end
		}
	},
	methods: {
		openDialog(ref) {
			this.$refs[ref].open();
		},
		closeDialog(ref) {
			this.$refs[ref].close();
		},

		onOpen() {

		},

		onClose(type) {

		},

		onPagination(e) {
			if (e) {
				this.getItems(e.page);
			} else {
				const { paging } = this.$store.getters;
				if (Object.keys(paging).length > 0) {
					const { current, total } = paging;
					this.options.maxResult = total;
					this.options.current = current;
					this.options.end = this.options.limit[this.helper.selectedLimitIndex];
				}
			}
		},

		onSizeChange(e) {
			const index = this.options.limit.indexOf(parseInt(e))
			this.helper.selectedLimitIndex = index;
			this.getItems(this.options.current, () => {
				this.$store.dispatch('setIsProgressVisible', false);
			});
		},

		sendRequest(endPoint, method = 'POST', token = null, data = null, callback) {
			internet.makeRequest(endPoint, method, token, data)
				.then((result) => {
					callback && callback(result)
				})
				.catch(reject => callback && callback(null));
		},

		view(e, item) {
			this.$router.push({
				path: '/viewCustomer', name: 'View Customer',
				params: {
					'customerId': item.customerId,
				}
			})
		},

		edit(e, item) {
			this.$router.push({
				path: '/editCustomer', name: 'Edit Customer',
				params: {
					'customerId': item.customerId,
				}
			})
		},

		getColumns() {
			const items = this.payload.items;
			if (items.length > 0) {
				const item = items[0];
				Object.keys(item)
					.map((key) => {
						const addSpace = collection.addSpaceInCamelCase(key.toString())
						const _key = collection.capitalizeCaseKey(addSpace)
						this.payload.columns.push(_key)
					});
				this.payload.columns = [' ', ...this.payload.columns];
				this.helper.isColumnRendered = true;
			}
		},

		getItems(pageNumber = 1, callback = null) {
			const { limit, sort } = this.options;
			const { start, end } = this.payload;

			let qsearch = "";

			if (start && end) {
				qsearch += `&start=${start.toISOString()}&end=${end.toISOString()}`;
			}

			qsearch = qsearch.trim();

			this.sendRequest(`/admin/customers?page=${pageNumber}&limit=${limit[this.helper.selectedLimitIndex]}${qsearch}`.trim(), 'GET', null, null, (result) => {
				if (result && !result.error && result.value && result.value.result && result.value.result.data) {
					this.payload.items = result.value.result.data.slice();
					const _data = Object.assign({ pageFor: constant.CUSTOMER }, { data: result.value.result.data, pages: { total:result.value.result.count, current: pageNumber }});
					this.$store.dispatch('setItems', _data);
					!this.helper.isColumnRendered && this.getColumns();
					this.onPagination(null);
					callback && callback();
				} else {
					console.log(result);
				}
			});
		},
	}
}
</script>

<style >
.md-table table {
overflow: scroll;
}
</style>
