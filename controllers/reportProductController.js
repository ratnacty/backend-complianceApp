const { ReportProduct, Store, Product, Brand, StoreArea, StoreAccount } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const data = await ReportProduct.findAll({
      include: [
        {
          model: Store,
          as: 'store',
          include: [
            { model: StoreArea, as: 'area' },
            { model: StoreAccount, as: 'account' },
          ],
        },
        {
          model: Product,
          as: 'product',
          include: [{ model: Brand, as: 'brand' }],
        },
      ],
      order: [['report_id', 'DESC']],
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await ReportProduct.findByPk(req.params.id, {
      include: [
        { model: Store, as: 'store', include: [{ model: StoreArea, as: 'area' }] },
        { model: Product, as: 'product', include: [{ model: Brand, as: 'brand' }] },
      ],
    });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await ReportProduct.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await ReportProduct.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.update(req.body);
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.destroy = async (req, res) => {
  try {
    const item = await ReportProduct.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.destroy();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
