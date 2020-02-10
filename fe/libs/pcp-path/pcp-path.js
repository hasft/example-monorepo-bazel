class PcpPath {
  constructor(path) {
    this.path = path;
    this.query = null;
  }

  parse() {
    this.query = {
      category_id: 'p-2016'
    };
    
    return this;
  }
}

export default function pcpPath(path) {
  return new PcpPath(path).parse();
}
