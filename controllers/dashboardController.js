const { ReportProduct, Store, Product, Brand, StoreArea, sequelize } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

exports.getChartData = async (req, res) => {
  try {
    const { area_id, date_from, date_to } = req.query;

    const whereReport = {};
    if (date_from && date_to) {
      whereReport.tanggal = { [Op.between]: [date_from, date_to] };
    } else if (date_from) {
      whereReport.tanggal = { [Op.gte]: date_from };
    } else if (date_to) {
      whereReport.tanggal = { [Op.lte]: date_to };
    }

    const whereStore = {};
    if (area_id) whereStore.area_id = area_id;

    // Get all areas (filtered or all)
    const areaQuery = area_id
      ? `SELECT area_id, area_name FROM store_area WHERE area_id = ${sequelize.escape(area_id)}`
      : `SELECT area_id, area_name FROM store_area ORDER BY area_id`;

    const [areas] = await sequelize.query(areaQuery);

    // Build date filter
    let dateFilter = '';
    if (date_from && date_to) {
      dateFilter = ` AND rp.tanggal BETWEEN ${sequelize.escape(date_from)} AND ${sequelize.escape(date_to)}`;
    } else if (date_from) {
      dateFilter = ` AND rp.tanggal >= ${sequelize.escape(date_from)}`;
    } else if (date_to) {
      dateFilter = ` AND rp.tanggal <= ${sequelize.escape(date_to)}`;
    }

    const areaFilter = area_id ? ` AND sa.area_id = ${sequelize.escape(area_id)}` : '';

    // Chart: Nilai per area = SUM(compliance) / COUNT(*) * 100
    const [chartRows] = await sequelize.query(`
      SELECT
        sa.area_id,
        sa.area_name,
        ROUND(SUM(rp.compliance) / COUNT(rp.report_id) * 100, 2) AS nilai
      FROM store_area sa
      LEFT JOIN store s ON s.area_id = sa.area_id
      LEFT JOIN report_product rp ON rp.store_id = s.store_id ${dateFilter.replace('rp.', 'rp.')}
      WHERE 1=1 ${areaFilter}
      GROUP BY sa.area_id, sa.area_name
      ORDER BY sa.area_id
    `);

    res.json({ success: true, data: chartRows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBrandTable = async (req, res) => {
  try {
    const { area_id, date_from, date_to } = req.query;

    let dateFilter = '';
    if (date_from && date_to) {
      dateFilter = ` AND rp.tanggal BETWEEN ${sequelize.escape(date_from)} AND ${sequelize.escape(date_to)}`;
    } else if (date_from) {
      dateFilter = ` AND rp.tanggal >= ${sequelize.escape(date_from)}`;
    } else if (date_to) {
      dateFilter = ` AND rp.tanggal <= ${sequelize.escape(date_to)}`;
    }

    const areaFilter = area_id ? ` AND sa.area_id = ${sequelize.escape(area_id)}` : '';

    // Get areas
    const areaQuery = area_id
      ? `SELECT area_id, area_name FROM store_area WHERE area_id = ${sequelize.escape(area_id)}`
      : `SELECT area_id, area_name FROM store_area ORDER BY area_id`;
    const [areas] = await sequelize.query(areaQuery);

    // Get brand x area nilai
    const [rows] = await sequelize.query(`
      SELECT
        b.brand_id,
        b.brand_name,
        sa.area_id,
        sa.area_name,
        ROUND(SUM(rp.compliance) / COUNT(rp.report_id) * 100, 2) AS nilai
      FROM brand b
      LEFT JOIN product p ON p.brand_id = b.brand_id
      LEFT JOIN report_product rp ON rp.product_id = p.product_id ${dateFilter}
      LEFT JOIN store s ON rp.store_id = s.store_id
      LEFT JOIN store_area sa ON s.area_id = sa.area_id
      WHERE sa.area_id IS NOT NULL ${areaFilter}
      GROUP BY b.brand_id, b.brand_name, sa.area_id, sa.area_name
      ORDER BY b.brand_id, sa.area_id
    `);

    // Pivot: brand rows, area columns
    const brandMap = {};
    rows.forEach(r => {
      if (!brandMap[r.brand_id]) {
        brandMap[r.brand_id] = { brand_id: r.brand_id, brand_name: r.brand_name };
      }
      brandMap[r.brand_id][`area_${r.area_id}`] = r.nilai;
    });

    res.json({
      success: true,
      areas,
      data: Object.values(brandMap),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const [[{ total_report }]] = await sequelize.query(
      `SELECT COUNT(*) as total_report FROM report_product`
    );
    const [[{ total_store }]] = await sequelize.query(
      `SELECT COUNT(*) as total_store FROM store`
    );
    const [[{ total_product }]] = await sequelize.query(
      `SELECT COUNT(*) as total_product FROM product`
    );
    const [[{ total_brand }]] = await sequelize.query(
      `SELECT COUNT(*) as total_brand FROM brand`
    );
    res.json({
      success: true,
      data: { total_report, total_store, total_product, total_brand },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
