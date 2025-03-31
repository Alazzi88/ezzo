// app/api/systemInfo/route.ts (أو pages/api/systemInfo.ts)
import { NextRequest, NextResponse } from 'next/server';
import os from 'os';
import https from 'https';

// دالة لجلب الـ IP العام من httpbin
function getPublicIP(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get('https://httpbin.org/ip', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.origin);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

// دالة لجلب الـ IP المحلي
function getLocalIP(): string {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

// دالة GET لمعالجة الطلب
export async function GET(req: NextRequest) {
  try {
    const publicIP = await getPublicIP();
    const systemInfo = {
      OS: os.type(),
      OSVersion: os.version ? os.version() : 'غير متوفر',
      OSRelease: os.release(),
      Architecture: os.arch(),
      Machine: os.arch(), // بديل لعدم توفر دالة مباشرة لنوع الجهاز
      Processor: os.cpus()[0].model,
      Hostname: os.hostname(),
      LocalIP: getLocalIP(),
      PublicIP: publicIP
    };

    return NextResponse.json(systemInfo);
  } catch (err) {
    return NextResponse.json(
      { error: 'خطأ في جلب المعلومات', details: err },
      { status: 500 }
    );
  }
}
