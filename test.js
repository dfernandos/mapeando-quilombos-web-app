import http from 'k6/http';
import { check, sleep } from 'k6';

export default function() {
  let res = http.get('https://www.linkedin.com/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}