<template>
	<div class="base-div">
		<md-table-card>
			<md-toolbar>
				<h1 class="md-title">Portfolios</h1>
				<md-button class="md-icon-button" id="custom" @click="openDialog('search_dialog')">
					<md-icon>search</md-icon>
				</md-button>
			</md-toolbar>

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
						</md-table-cell>
						<md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex">
							<span v-html="column"></span>
						</md-table-cell>
					</md-table-row>
				</md-table-body>
			</md-table>

			<TablePagination :mdTotal="MaxResult" :mdSize="End" :mdPage="Current" :mdPageOptions="Limit" @pagination="onPagination" @size="onSizeChange"/>

			<md-dialog md-open-from="#custom" md-close-to="#custom" ref="search_dialog">
				
				<md-dialog-title>Search for a item in the database</md-dialog-title>
				
				<div style="display:flex; flex:1; flex-direction:row; max-width:380px; flex-wrap:wrap;">
					<div v-for="(filter, filterIndex) in Filters" :key="filterIndex" style="padding:5px 15px;">
						<md-chip md-deletable class="md-accent" @delete="()=> onDeleteFilter(filterIndex)">{{filter.key }} - {{filter.value}}</md-chip>
					</div>
				</div>

				<md-dialog-content>
					<form>
						<md-input-container>
							<label>Key</label>
							<md-select v-model="searchKey.key">
								<md-option v-for="(columnKey, columnKeyIndex) in SearchColumns" :value="columnKey.value" :key="columnKeyIndex" >{{columnKey.key}}</md-option>
							</md-select>
						</md-input-container>

						<md-input-container>
							<label>Value</label>
							<md-textarea v-model="searchKey.value"></md-textarea>
						</md-input-container>
					</form>
				</md-dialog-content>

				<md-dialog-actions>
					<md-button class="md-primary" @click="(e)=> cancelFilter('search_dialog')">Cancel all filter</md-button>
					<md-button class="md-primary" @click="createChips">Add filter</md-button>
					<md-button class="md-primary" @click="onDialogSearch('search_dialog')">Search filter</md-button>
				</md-dialog-actions>

			</md-dialog>
		</md-table-card>
	</div>
</template>


<script>
import TablePagination from '../util/tablePagination.vue';

import * as internet from '../../../../helper/internet';
import * as constant from '../../../../helper/constant.js';
import * as collection from '../../../../helper/collection.js';

export default {
	beforeMount() {
		this.$store.dispatch("setCurrentRoute", "/viewPortfolios");
	},

	mounted() {
		if (this.$store.getters.pageFor == constant.PORTFOLIO) {
			this.options.current = this.$store.getters.appPreviousPage;
		}

		this.options.end = this.options.limit[this.helper.selectedLimitIndex];
		this.getItems(this.options.current, null, () => {
			this.$store.dispatch('setIsProgressVisible', false);
		});
	},

	data() {
		return {
			payload: {
				items: [],
				columns: [],
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
					{ key: 'Market', value: 'market' },
					{ key: 'Target', value: 'target' },
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

		createChips() {
			const { key, value } = this.searchKey;
			if(value.length < 1) return;
			if (this.helper.selectedFilters.filter(x => x.key == key).length > 0) {
				this.helper.selectedFilters = this.helper.selectedFilters.map(x => {
					if (x.key == key) {
						x.value = value;
					}
					return x;
				});
			} else {
				this.helper.selectedFilters.push({ key, value });
			}
		},

		onDeleteFilter(e) {
			this.helper.selectedFilters.splice(e, 1);
		},

		onDialogSearch(ref) {
			this.$refs[ref].close();
			const item = this.helper.selectedFilters.map(x => {
				const key = x.key;
				let obj = {};
				obj[key] = x.value;
				return obj;
			}).reduce((result, y) => {
				const key = Object.keys(y)[0];
				result[key] = y[key];
				return result;
			}, {});

			this.getItems(1, item);
		},

		cancelFilter(ref) {
			this.helper.selectedFilters = [];
			this.getItems(1);
			this.$refs[ref].close();
		},

		onPagination(e) {
			if (e) {
				const item = this.helper.selectedFilters.map(x => {
					const key = x.key;
					let obj = {};
					obj[key] = x.value;
					return obj;
				}).reduce((result, y) => {
					const key = Object.keys(y)[0];
					result[key] = y[key];
					return result;
				}, {});

				if(typeof item == "object") {
					this.getItems(e.page, item);
				} else {
					this.getItems(e.page);
				}
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
			this.getItems(this.options.current, null, () => {
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
				path: '/viewPortfolio', name: 'View Portfolio',
				params: {
					'customerId': item.customerId,
					'objectId': item._id,
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

		getItems(pageNumber = 1, search = null, callback = null) {
			const { limit, sort } = this.options;
			
			let qsearch = "";

			if (search && Object.keys(search).length > 0) {
				for (var key of Object.keys(search)) {
					qsearch += `&${key}=${search[key]}`;
				}
			}

			qsearch = qsearch.trim();
			
			this.sendRequest(`/admin/portfolios?page=${pageNumber}&limit=${limit[this.helper.selectedLimitIndex]}${qsearch}`.trim(), 'GET', null, null, (result) => {
				if (result && !result.error && result.value && result.value.result && result.value.result.data) {
					this.payload.items = result.value.result.data.slice();
					const _data = Object.assign({ pageFor: constant.PORTFOLIO }, { data: result.value.result.data, pages: { total:result.value.result.count, current: pageNumber }});
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
