class TableModel {
  static async test() {
    return { ello: "true" }
  }

	static async insert(table, body) {
		let test = { table , insertion: { ...body } }
    return test;
  }

	static async getAll(table) {
		

		return { ello: "true" };
	}

	static async getByID(table, id) {
		

		return { ello: "true" };
	}

	static async getByName(table, name) {
		

		return { ello: "true" };
	}

	static async getFilteredBy(table, col, val) {
		

		return { ello: "true" };
	}
}

module.exports = TableModel;